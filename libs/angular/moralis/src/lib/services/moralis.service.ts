import { Inject, Injectable, NgZone } from '@angular/core';
import { LoggerService, LoggerToken } from '@dehub/angular/core';
import {
  moralisProviderLocalStorageKey,
  MoralisWeb3ProviderType,
  WalletConnectingState,
} from '@dehub/shared/model';
import {
  decimalToHex,
  filterEmpty,
  publishReplayRefCount,
  setupMetamaskNetwork,
} from '@dehub/shared/util';
import { WINDOW } from '@ng-web-apis/common';
import * as events from 'events';
import { Moralis } from 'moralis';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  first,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Attributes, User } from '../models/moralis.models';

interface IMoralis {
  user$: Observable<User | undefined>;
  userAttributes$: Observable<Attributes | undefined>;
  account$: Observable<string | undefined>;
  isAuthenticated$: Observable<boolean>;

  username$: Observable<string>;

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

  account$ = this.accountSubject.asObservable().pipe(
    distinctUntilChanged(),
    tap(account => this.logger.info(`Current account: ${account}`)),
    publishReplayRefCount()
  );

  userAttributes$ = this.user$.pipe(map(user => user?.attributes));

  isAuthenticated$ = this.user$.pipe(map(user => !!user));

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

  constructor(
    @Inject(LoggerToken) private logger: LoggerService,
    @Inject(WINDOW) readonly windowRef: Window,
    private ngZone: NgZone
  ) {
    if (Moralis.User.current()) {
      const provider = this.windowRef.localStorage.getItem(
        moralisProviderLocalStorageKey
      ) as MoralisWeb3ProviderType;
      if (provider) {
        this.logger.info(`Moralis enableWeb3 for '${provider}'`);

        Moralis.enableWeb3({ provider }).then(() => {
          this.subscribeEvents();
        });
      }
    }
  }

  login(provider: MoralisWeb3ProviderType, chainId: number) {
    this.requiredChainHex = decimalToHex(chainId);
    this.setWalletConnectingState(WalletConnectingState.WAITING);

    const commonAuthOptions: Moralis.AuthenticationOptions = {
      chainId,
      signingMessage: 'DeHub D’App',
    };

    (provider === 'metamask'
      ? Moralis.authenticate(commonAuthOptions).then(async loggedInUser => {
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
      : Moralis.authenticate({ ...commonAuthOptions, provider }).then(
          loggedInUser => {
            this.userSubject.next(loggedInUser as User);
            this.accountSubject.next(loggedInUser.attributes.ethAddress);
          }
        )
    )
      .then(() => {
        this.setWalletConnectingState(WalletConnectingState.COMPLETE);
        this.windowRef.localStorage.setItem(
          moralisProviderLocalStorageKey,
          provider
        );
        this.subscribeEvents();
      })
      .catch(e => {
        this.setWalletConnectingState(WalletConnectingState.INIT);
        this.logger.error(`Moralis '${provider}' login error:`, e);
      });
  }

  logout() {
    this.logger.info('Logging out.');

    this.unsubscribeEvents();
    Moralis.User.logOut()
      .catch(e => this.logger.error('Moralis logout problem:', e))
      .finally(() => {
        // Cleanup web provider from local storage
        this.windowRef.localStorage.removeItem(moralisProviderLocalStorageKey);

        // Set user and account to undefined
        this.userSubject.next(undefined);
        this.accountSubject.next(undefined);

        // Disconnect Web3 wallet
        Moralis.cleanup();

        // Reset Wallet connecting state
        this.setWalletConnectingState(WalletConnectingState.INIT);
      });
  }

  /**
   * Update Wallet Connect state
   * @param state the state to set
   */
  setWalletConnectingState(state: WalletConnectingState) {
    this.walletConnectingStateSubject.next(state);
  }

  private subscribeEvents() {
    this.logger.info(
      'Subscribe: onWeb3Deactivated, onChainChanged, onAccountChanged'
    );
    this.unsubscribeFromWeb3Deactivated = Moralis.onWeb3Deactivated(error => {
      this.ngZone.run(() => {
        this.logger.warn(
          `Moralis ${error.connector.type} connector was deactivated!`
        );
        this.logout();
      });
    });

    this.unsubscribeFromChainChanged = Moralis.onChainChanged(newChainHex => {
      this.ngZone.run(() => {
        const requiredChainHex = this.requiredChainHex;
        if (requiredChainHex !== newChainHex) {
          this.logger.warn(
            `Moralis chain changed from ${requiredChainHex} to ${newChainHex}!`
          );
          this.logout();
        }
      });
    });

    this.unsubscribeFromAccountChanged = Moralis.onAccountChanged(account => {
      this.ngZone.run(() => {
        if (account) {
          const newAccount = account.toLowerCase();
          this.account$
            .pipe(filterEmpty(), first())
            .subscribe(currentAccount => {
              if (newAccount !== currentAccount) {
                this.logger.warn(
                  `Moralis account has changed to ${newAccount}!`
                );
                this.handleAccountChanged(newAccount);
              } else {
                this.logger.warn(`Moralis account has not changed!`);
              }
            });
        } else {
          this.logger.warn(`Moralis all accounts are disconnected!`);
          this.logout();
        }
      });
    });
  }

  private handleAccountChanged(newAccount: string) {
    this.user$
      .pipe(filterEmpty(), first())
      .subscribe(async ({ attributes: { accounts = [] } }) => {
        // Ask linking new account
        if (!accounts.includes(newAccount)) {
          const confirmed = confirm(
            'Please confirm account linking with your wallet.'
          );

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
          this.logger.warn(
            `The ${newAccount} is already linked to the users account.`
          );
          this.accountSubject.next(newAccount);
        }
      });
  }

  private unsubscribeEvents() {
    this.logger.info('Unsubscribe Moralis events.');
    this.unsubscribeFromWeb3Deactivated?.();
    this.unsubscribeFromChainChanged?.();
    this.unsubscribeFromAccountChanged?.();
  }
}
