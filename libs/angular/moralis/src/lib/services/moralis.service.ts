import { Inject, Injectable, NgZone } from '@angular/core';
import {
  ILoggerService,
  IMoralisService,
  LoggerToken,
} from '@dehub/angular/model';
import { Networks } from '@dehub/shared/config';
import {
  enableOptionsLocalStorageKey,
  MoralisWeb3ProviderType,
  User,
  WalletConnectingState,
} from '@dehub/shared/model';
import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import {
  filterEmpty,
  getRandomRpcUrl,
  publishReplayRefCount,
  setupMetamaskNetwork,
} from '@dehub/shared/utils';
import { WINDOW } from '@ng-web-apis/common';
import * as events from 'events';
import { Moralis } from 'moralis';
import { BehaviorSubject, from, of } from 'rxjs';
import {
  distinctUntilChanged,
  first,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable()
export class MoralisService implements IMoralisService {
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
    @Inject(LoggerToken) private logger: ILoggerService,
    @Inject(WINDOW) private readonly windowRef: Window,
    private ngZone: NgZone
  ) {
    if (Moralis.User.current()) {
      const enableOptionsStr = this.windowRef.localStorage.getItem(
        enableOptionsLocalStorageKey
      );

      if (enableOptionsStr) {
        const enableOptions = JSON.parse(
          enableOptionsStr
        ) as Moralis.EnableOptions;

        this.logger.info(
          `Moralis enableWeb3 for '${enableOptions.provider}'`,
          enableOptions
        );

        Moralis.enableWeb3(enableOptions).then(() => this.subscribeEvents());
      } else {
        this.logger.warn('Local Storage login options was deleted!');
        this.logout();
      }
    }
  }

  login(
    provider: MoralisWeb3ProviderType,
    chainId: number,
    magicLinkEmail: string,
    magicLinkApiKey: string
  ) {
    let enableOptions: Moralis.EnableOptions;

    this.requiredChainHex = decimalToHex(chainId);
    this.setWalletConnectingState(WalletConnectingState.WAITING);
    const signingMessage = 'DeHub D’App';

    let userPromise: Promise<Moralis.User<Moralis.Attributes> | undefined> =
      Promise.resolve(undefined);

    switch (provider) {
      case 'metamask':
        enableOptions = { chainId };

        userPromise = Moralis.authenticate({
          ...enableOptions,
          signingMessage,
        }).then(loggedInUser =>
          setupMetamaskNetwork(
            chainId,
            () =>
              this.setWalletConnectingState(
                WalletConnectingState.SWITCH_NETWORK
              ),
            () =>
              this.setWalletConnectingState(WalletConnectingState.ADD_NETWORK)
          ).then(success => (success ? loggedInUser : undefined))
        );
        break;

      case 'walletconnect':
        enableOptions = { chainId, provider };
        userPromise = Moralis.authenticate({
          ...enableOptions,
          provider,
          signingMessage,
        });
        break;

      case 'magicLink':
        enableOptions = {
          network: {
            rpcUrl: getRandomRpcUrl(Networks[chainId].nodes),
            chainId,
          } as unknown as string,
          provider,
          email: magicLinkEmail,
          apiKey: magicLinkApiKey,
        };

        userPromise = Moralis.authenticate({
          ...enableOptions,
          provider,
          signingMessage,
        }).then(loggedInUser => {
          // Save the email as Moralis not store MagicLink email after login
          loggedInUser.set('email', magicLinkEmail);

          return loggedInUser.save();
        });
        break;

      default:
        this.logger.warn(`Not supported provider: ${provider}!`);
    }

    userPromise
      .then(loggedInUser => {
        if (loggedInUser) {
          this.updateUserAndAccount(loggedInUser);
          this.setWalletConnectingState(WalletConnectingState.COMPLETE);
          this.windowRef.localStorage.setItem(
            enableOptionsLocalStorageKey,
            JSON.stringify(enableOptions)
          );
          this.subscribeEvents();
        } else {
          this.logout();
        }
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
        // Cleanup local storage
        this.windowRef.localStorage.removeItem(enableOptionsLocalStorageKey);

        // Set user and account to undefined
        this.updateUserAndAccount(undefined);

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
              // Emit new user with updated accounts and new linked account
              .then(user => this.updateUserAndAccount(user, newAccount))
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

  private updateUserAndAccount(
    loggedInUser?: Moralis.User<Moralis.Attributes>,
    account?: string
  ) {
    this.userSubject.next(loggedInUser as User);
    this.accountSubject.next(account ?? loggedInUser?.attributes.ethAddress);
  }
}
