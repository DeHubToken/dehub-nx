import { Inject, Injectable, NgZone } from '@angular/core';
import {
  ILoggerService,
  IMoralisService,
  LoggerToken,
} from '@dehub/angular/model';
import { Networks } from '@dehub/shared/config';
import {
  DeHubConnectorNames,
  enableOptionsLocalStorageKey,
  EnableOptionsPersisted,
  MoralisConnectorNames,
  User,
  WalletConnectingMessages,
  WalletConnectingState,
  WalletConnectState,
  Web3ConnectorNames,
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
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { BehaviorSubject, from, of } from 'rxjs';
import {
  distinctUntilChanged,
  first,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  BinanceConnector,
  BinanceNetworkSwitchRejected,
} from '../connector/binance-connector';

const web3Connectors: { [key: string]: Moralis.Connector } = {
  [Web3ConnectorNames.BSC]: Object(new BinanceConnector())
    .constructor as BinanceConnector,
};

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

  userContacts$ = this.userAttributes$.pipe(
    filterEmpty(),
    map(({ email, phone }) => ({ email, phone }))
  );

  private walletConnectStateSubject = new BehaviorSubject<WalletConnectState>({
    state: WalletConnectingState.INIT,
  });

  walletConnectState$ = this.walletConnectStateSubject.asObservable().pipe(
    tap(({ connectorId, state }) =>
      this.logger.info(
        `Wallet Connect State: ${WalletConnectingState[state]} ${
          connectorId ? `(${connectorId})` : ''
        }`
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
    private ngZone: NgZone,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    if (Moralis.User.current()) {
      const enableOptionsStr = this.windowRef.localStorage.getItem(
        enableOptionsLocalStorageKey
      );

      if (enableOptionsStr) {
        const enableOptions = JSON.parse(
          enableOptionsStr
        ) as EnableOptionsPersisted;

        // Web3 Connector
        const connectorConstructor = enableOptions.connector;
        if (connectorConstructor) {
          this.logger.info(
            `Moralis enableWeb3 for '${connectorConstructor}'`,
            enableOptions
          );
          // Binance
          if (connectorConstructor === Web3ConnectorNames.BSC) {
            Moralis.enableWeb3({
              ...enableOptions,
              connector: web3Connectors[Web3ConnectorNames.BSC],
            }).then(() => this.subscribeEvents());
          }
        } else {
          // Moralis Connector
          this.logger.info(
            `Moralis enableWeb3 for '${enableOptions.provider}'`,
            enableOptions
          );
          Moralis.enableWeb3(enableOptions).then(() => this.subscribeEvents());
        }
      } else {
        this.logger.warn('Local Storage login options was deleted!');
        this.logout();
      }
    }
  }

  async login(
    connectorId: DeHubConnectorNames,
    chainId: number,
    magicLinkEmail: string,
    magicLinkApiKey: string
  ) {
    let enableOptions: Moralis.EnableOptions;

    this.requiredChainHex = decimalToHex(chainId);
    this.setWalletConnectState(WalletConnectingState.WAITING);
    const signingMessage = 'DeHub D’App';

    let userPromise: Promise<Moralis.User<Moralis.Attributes> | undefined> =
      Promise.resolve(undefined);

    switch (connectorId) {
      case MoralisConnectorNames.Injected:
        enableOptions = { chainId };

        userPromise = Moralis.authenticate({
          ...enableOptions,
          signingMessage,
        }).then(loggedInUser =>
          setupMetamaskNetwork(
            chainId,
            () =>
              this.setWalletConnectState(WalletConnectingState.SWITCH_NETWORK),
            () => this.setWalletConnectState(WalletConnectingState.ADD_NETWORK)
          ).then(success => (success ? loggedInUser : undefined))
        );
        break;

      case MoralisConnectorNames.WalletConnect:
        enableOptions = { chainId, provider: connectorId };
        userPromise = Moralis.authenticate({
          ...enableOptions,
          signingMessage,
        });
        break;

      case MoralisConnectorNames.MagicLink:
        enableOptions = {
          network: {
            rpcUrl: getRandomRpcUrl(Networks[chainId].nodes),
            chainId,
          } as unknown as string,
          provider: connectorId,
          email: magicLinkEmail,
          apiKey: magicLinkApiKey,
        };

        userPromise = Moralis.authenticate({
          ...enableOptions,
          provider: connectorId,
          signingMessage,
        }).then(loggedInUser => {
          // Save the email as Moralis not store MagicLink email after login
          loggedInUser.set('email', magicLinkEmail);

          return loggedInUser.save();
        });
        break;

      case Web3ConnectorNames.BSC:
        enableOptions = {
          chainId,
          // To get type safety instead of: ({connector: BinanceConnector})
          connector: web3Connectors[Web3ConnectorNames.BSC],
        };
        userPromise = Moralis.authenticate({
          ...enableOptions,
          signingMessage,
        });
        break;

      default:
        this.logger.warn(`Not supported provider: ${connectorId}!`);
    }

    return userPromise
      .then(loggedInUser => {
        if (loggedInUser) {
          this.updateUserAndAccount(loggedInUser);
          this.setWalletConnectState(WalletConnectingState.COMPLETE);

          // Store enableOptions
          this.windowRef.localStorage.setItem(
            enableOptionsLocalStorageKey,
            JSON.stringify(enableOptions, (key, value) => {
              // Store Connector Id web3 connectors
              if (key === 'connector') return connectorId;
              return value;
            })
          );

          this.subscribeEvents();
        } else {
          this.logout();
        }
      })
      .catch(e => {
        // Metamask, Binance Error
        if (e.code && e.message) {
          // Signature refused
          if (e.code === 4001 || e.code === -32603) {
            this.messageService.add({
              severity: 'warn',
              summary: WalletConnectingMessages.ConnectWallet,
              detail:
                e.code === 4001
                  ? WalletConnectingMessages.MetamaskSignatureDenied
                  : WalletConnectingMessages.BinanceSignatureRejected,
            });
            this.setWalletConnectState(WalletConnectingState.INIT, connectorId);
          }

          // Binance Error (e.g. Binance cancel connect request)
        } else if (
          e instanceof BinanceNetworkSwitchRejected ||
          (e.message && e.message.includes('An unexpected error occurred'))
        ) {
          this.setWalletConnectState(WalletConnectingState.INIT, connectorId);

          // Moralis Error
        } else if (e instanceof Error) {
          this.messageService.add({
            severity: 'error',
            summary: WalletConnectingMessages.ConnectWallet,
            detail: WalletConnectingMessages.UnsupportedProvider,
          });

          this.setWalletConnectState(
            WalletConnectingState.NO_PROVIDER,
            connectorId
          );
        }
        throw e;
      });
  }

  async logout() {
    this.logger.info('Logging out.');

    this.unsubscribeEvents();
    return Moralis.User.logOut<User>()
      .catch(e => this.logger.error('Moralis logout problem:', e))
      .finally(() => {
        // Cleanup local storage
        this.windowRef.localStorage.removeItem(enableOptionsLocalStorageKey);

        // Set user and account to undefined
        this.updateUserAndAccount(undefined);

        // Disconnect Web3 wallet
        Moralis.cleanup();

        // Reset Wallet connecting state
        this.setWalletConnectState(WalletConnectingState.INIT);
      });
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
      .subscribe(({ attributes: { accounts = [] } }) => {
        // Ask linking new account
        if (!accounts.includes(newAccount)) {
          this.confirmationService.confirm({
            message: 'Please confirm account linking with your wallet.',
            header: 'Account Linking',
            icon: 'fa fa-link',
            acceptIcon: 'fa fa-link',
            acceptLabel: 'Link',
            rejectLabel: 'Cancel',
            rejectButtonStyleClass: 'p-button-outlined',
            // Confirmed linking
            accept: async () => {
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
            },
            // Canceled linking
            reject: (_type: ConfirmEventType) => this.logout(),
          });
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

  /**
   * Update Wallet Connect state
   * @param state the state to set
   */
  private setWalletConnectState(
    state: WalletConnectingState,
    connectorId?: DeHubConnectorNames
  ) {
    this.walletConnectStateSubject.next({ connectorId, state });
  }
}
