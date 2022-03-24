import { Inject, Injectable } from '@angular/core';
import { LoggerService, LoggerToken } from '@dehub/angular/core';
import {
  MoralisWeb3ProviderType,
  WalletConnectingState,
} from '@dehub/shared/model';
import {
  decimalToHex,
  filterEmpty,
  publishReplayRefCount,
  setupMetamaskNetwork,
} from '@dehub/shared/util';
import * as events from 'events';
import { Moralis } from 'moralis';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/moralis.models';

interface IMoralis {
  user$: Observable<User | undefined>;
  account$: Observable<string | undefined>;
  isAuthenticated$: Observable<boolean>;

  username$: Observable<string>;
  canPlay$: Observable<boolean>;

  login: (provider: MoralisWeb3ProviderType, chainId: number) => void;
  logout: () => void;

  walletConnectingState$: Observable<WalletConnectingState>;
  setWalletConnectingState: (state: WalletConnectingState) => void;
}
@Injectable()
export class MoralisService implements IMoralis {
  private userSubject = new BehaviorSubject<User | undefined>(
    Moralis.User.current()
  );
  private accountSubject = new BehaviorSubject<string | undefined>(
    Moralis.User.current()?.attributes.ethAddress
  );

  user$ = this.userSubject.asObservable().pipe(
    // Need to refetch current user for updated attributes
    switchMap(currentUser =>
      currentUser ? from(currentUser.fetch() as Promise<User>) : of(undefined)
    ),
    tap(loggedInUser =>
      this.logger.info(`Current user:`, loggedInUser?.attributes)
    )
  );

  account$ = this.accountSubject
    .asObservable()
    .pipe(tap(account => this.logger.info(`Current account: ${account}`)));

  private userAttributes$ = this.user$.pipe(map(user => user?.attributes));

  isAuthenticated$ = this.user$.pipe(map(user => !!user));

  canPlay$ = this.userAttributes$.pipe(
    map(attributes => attributes?.can_play ?? false)
  );

  username$ = this.userAttributes$.pipe(
    filterEmpty(),
    map(({ username }) => username)
  );

  private walletConnectingStateSubject =
    new BehaviorSubject<WalletConnectingState>(WalletConnectingState.INIT);

  walletConnectingState$ = this.walletConnectingStateSubject
    .asObservable()
    .pipe(
      tap(walletConnectingState =>
        this.logger.info(
          `Wallet Connecting State: ${WalletConnectingState[walletConnectingState]}`
        )
      ),
      publishReplayRefCount()
    );

  private requiredChainHex?: string;

  /** Triggered after user closed the session from his wallet (Walletconnect) */
  private unsubscribeFromWeb3Deactivated?: () => events.EventEmitter;
  private unsubscribeFromChainChanged?: () => events.EventEmitter;
  private unsubscribeFromAccountChanged?: () => events.EventEmitter;

  constructor(@Inject(LoggerToken) private logger: LoggerService) {}

  login(provider: MoralisWeb3ProviderType, chainId: number) {
    this.requiredChainHex = decimalToHex(chainId);
    this.setWalletConnectingState(WalletConnectingState.WAITING);
    const signingMessage = 'DeHub D’App';

    (provider === 'metamask'
      ? Moralis.authenticate({ signingMessage }).then(async loggedInUser => {
          if (
            await setupMetamaskNetwork(
              chainId,
              () =>
                this.setWalletConnectingState(
                  WalletConnectingState.SWITCH_NETWORK
                ),
              () =>
                this.setWalletConnectingState(WalletConnectingState.ADD_NETWORK)
            )
          ) {
            this.userSubject.next(loggedInUser as User);
            this.accountSubject.next(loggedInUser.attributes.ethAddress);
          } else {
            this.logout();
          }
        })
      : Moralis.authenticate({ signingMessage, provider }).then(
          loggedInUser => {
            this.userSubject.next(loggedInUser as User);
            this.accountSubject.next(loggedInUser.attributes.ethAddress);
          }
        )
    )
      .then(() => this.setWalletConnectingState(WalletConnectingState.COMPLETE))
      .catch(e => {
        this.setWalletConnectingState(WalletConnectingState.INIT);
        this.logger.error(`Moralis '${provider}' login error:`, e);
      })
      .finally(() => this.subscribeEvents());
  }

  logout() {
    this.unsubscribeEvents();
    Moralis.User.logOut()
      .then(() => this.logger.info('Logging out.'))
      // Set user to undefined
      .then(() => this.userSubject.next(undefined))
      // Set account to undefined
      .then(() => this.accountSubject.next(undefined))
      // Disconnect Web3 wallet
      .then(() => Moralis.cleanup())
      .catch(e => this.logger.error('Moralis logout problem:', e))
      // Update wallet connecting state
      .finally(() => this.setWalletConnectingState(WalletConnectingState.INIT));
  }

  setWalletConnectingState(state: WalletConnectingState) {
    this.walletConnectingStateSubject.next(state);
  }

  private subscribeEvents() {
    this.unsubscribeFromWeb3Deactivated = Moralis.onWeb3Deactivated(error => {
      this.logger.info(
        `Moralis ${error.connector.type} connector was deactivated!`
      );
      this.logout();
    });

    this.unsubscribeFromChainChanged = Moralis.onChainChanged(newChainHex => {
      const requiredChainHex = this.requiredChainHex;
      if (requiredChainHex !== newChainHex) {
        this.logger.info(
          `Moralis chain changed from ${requiredChainHex} to ${newChainHex}!`
        );
        this.logout();
      }
    });

    this.unsubscribeFromAccountChanged = Moralis.onAccountChanged(account => {
      if (account) {
        const newAccount = account.toLowerCase();
        this.logger.info(`Moralis account has changed to ${newAccount}!`);
        this.handleAccountChanged(newAccount);
      } else {
        this.logger.info(`Moralis account disconnected!`);
        this.logout();
      }
    });
  }

  private handleAccountChanged(newAccount: string) {
    this.user$
      .pipe(filterEmpty(), first())
      .subscribe(async ({ attributes: { accounts = [] } }) => {
        // Ask linking new account
        if (!accounts.includes(newAccount)) {
          const confirmed = confirm('Link this address to your account?');

          // Confirmed linking new account
          if (confirmed) {
            this.logger.info(`Linking ${newAccount} to the users account.`);

            await Moralis.link(newAccount)
              // Emit new user with updated accounts
              .then(user => this.userSubject.next(user as User))
              // Emit new linked account
              .then(() => this.accountSubject.next(newAccount))
              .catch(e =>
                this.logger.error(
                  `Moralis linking ${newAccount} account problem:`,
                  e
                )
              );
          } else {
            // Rejected linking new account
            this.logout();
          }
        } else {
          // Account already linked
          this.logger.info(
            `The ${newAccount} is already linked to the users account.`
          );
          this.accountSubject.next(newAccount);
        }
      });
  }

  private unsubscribeEvents() {
    this.unsubscribeFromWeb3Deactivated?.();
    this.unsubscribeFromChainChanged?.();
    this.unsubscribeFromAccountChanged?.();
  }
}
