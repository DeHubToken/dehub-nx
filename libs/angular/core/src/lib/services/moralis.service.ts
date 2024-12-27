import { Inject, Injectable, NgZone } from '@angular/core';
import {
  EnvToken,
  ILoggerService,
  IMoralisService,
  LoggerMoralisToken,
} from '@dehub/angular/model';
import Bep20Abi from '@dehub/shared/asset/dehub/abis/erc20.json';
import {
  Attributes,
  ChainId,
  DeHubConnectorNames,
  EnableOptionsPersisted,
  Erc20Allowance,
  GetNativeBalanceParameters,
  GetTokenAllowanceParameters,
  GetTokenBalancesParameters,
  GetTokenMetadataParameters,
  MoralisConnectorNames,
  MoralisMessage,
  MoralisUser,
  SharedEnv,
  WalletConnectState,
  WalletConnectingMessage,
  WalletConnectingState,
  Web3ConnectorNames,
  enableOptionsLocalStorageKey,
} from '@dehub/shared/model';
import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import {
  filterNil,
  getRandomRpcUrlByChainId,
  getWalletConnectQrModalOptions,
  publishReplayRefCount,
  setupMetamaskNetwork,
  shortenAddress,
} from '@dehub/shared/utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { WINDOW } from '@ng-web-apis/common';
import * as events from 'events';
import { Moralis } from 'moralis-v1';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import {
  BehaviorSubject,
  Observable,
  catchError,
  concatMap,
  distinctUntilChanged,
  first,
  from,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  BinanceConnector,
  BinanceNetworkSwitchRejected,
} from '../connector/binance-connector';

const web3Connectors: { [key: string]: Moralis.Connector } = {
  [Web3ConnectorNames.BSC]: Object(new BinanceConnector())
    .constructor as BinanceConnector,
};

@Injectable({ providedIn: 'root' })
export class MoralisService implements IMoralisService {
  private userSubject = new BehaviorSubject<MoralisUser | undefined>(
    Moralis.User.current()
  );
  private accountSubject = new BehaviorSubject<string | undefined>(
    Moralis.User.current()?.attributes.ethAddress
  );

  user$ = this.userSubject.asObservable().pipe(
    // Need to refetch current user for updated attributes
    switchMap(currentUser =>
      currentUser ? from(currentUser.fetch()) : of(undefined)
    ),
    tap(loggedInUser =>
      this.logger.debug(`Current user:`, loggedInUser?.attributes)
    )
  );

  account$ = this.accountSubject.asObservable().pipe(
    distinctUntilChanged(),
    tap(account => this.logger.debug(`Current account: ${account}`)),
    publishReplayRefCount()
  );

  userAttributes$ = this.user$.pipe(map(user => user?.attributes));

  isAuthenticated$ = this.user$.pipe(map(user => !!user));

  username$ = this.userAttributes$.pipe(
    filterNil(),
    map(({ username }) => username)
  );

  private walletConnectStateSubject = new BehaviorSubject<WalletConnectState>({
    state: WalletConnectingState.INIT,
  });

  walletConnectState$ = this.walletConnectStateSubject.asObservable().pipe(
    tap(({ connectorId, state }) =>
      this.logger.debug(
        `Wallet Connect State: ${WalletConnectingState[state]} ${
          connectorId ? `(${connectorId})` : ''
        }`
      )
    ),
    publishReplayRefCount()
  );

  private requiredChainHex?: ChainId;

  /** Triggered after user closed the session from his wallet (Walletconnect) */
  private unsubscribeFromWeb3Deactivated?: () => events.EventEmitter;
  private unsubscribeFromChainChanged?: () => events.EventEmitter;
  private unsubscribeFromAccountChanged?: () => events.EventEmitter;

  constructor(
    @Inject(LoggerMoralisToken) private logger: ILoggerService,
    @Inject(WINDOW) private readonly windowRef: Window,
    @Inject(EnvToken) private env: SharedEnv,
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

  updateUser$(attributes: Partial<Attributes>): Observable<MoralisUser> {
    return this.user$.pipe(
      filterNil(),
      first(),
      switchMap(user =>
        from(user.save(attributes)).pipe(
          catchError(e => {
            let detail = MoralisMessage.UpdateUserProblem;
            if (e instanceof Error && e.message.includes('email')) {
              detail = MoralisMessage.ExistingEmail;
            }
            this.messageService.add({
              severity: 'error',
              summary: MoralisMessage.UpdateUser,
              detail,
            });

            throw new Error(e);
          })
        )
      ),
      tap(({ attributes }) => this.logger.debug('Updated user:', attributes))
    );
  }

  async login(
    connectorId: DeHubConnectorNames,
    chainId: number,
    magicLinkEmail: string,
    magicLinkApiKey: string
  ) {
    const {
      baseUrl,
      web3: {
        auth: { walletConnectProjectId },
      },
      dehub: { landing },
    } = this.env;
    const legalPage = `${landing}${baseUrl}`;

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
        enableOptions = {
          chainId,
          provider: connectorId,
          newSession: true,
          projectId: walletConnectProjectId,
          qrModalOptions: getWalletConnectQrModalOptions(legalPage),
        };
        userPromise = Moralis.authenticate({
          ...enableOptions,
          signingMessage,
        });

        // Not save new session into local storage
        delete enableOptions.newSession;
        break;

      case MoralisConnectorNames.MagicLink:
        enableOptions = {
          network: {
            rpcUrl: getRandomRpcUrlByChainId(chainId),
            chainId,
          } as unknown as string,
          provider: connectorId,
          newSession: 'true',
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

        // Not save new session into local storage
        delete enableOptions.newSession;
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
              summary: WalletConnectingMessage.ConnectWallet,
              detail:
                e.code === 4001
                  ? WalletConnectingMessage.MetamaskSignatureDenied
                  : WalletConnectingMessage.BinanceSignatureRejected,
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
            summary: WalletConnectingMessage.ConnectWallet,
            detail: WalletConnectingMessage.UnsupportedProvider,
          });

          this.setWalletConnectState(
            WalletConnectingState.NO_PROVIDER,
            connectorId
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: JSON.stringify(e),
            detail: WalletConnectingMessage.UnknownError,
          });
          throw e;
        }
      });
  }

  async logout() {
    this.logger.info('Logging out.');

    this.unsubscribeEvents();
    return Moralis.User.logOut<MoralisUser>()
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
    this.logger.debug(
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
          this.account$.pipe(filterNil(), first()).subscribe(currentAccount => {
            if (newAccount !== currentAccount) {
              this.logger.warn(`Moralis account has changed to ${newAccount}!`);
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
      .pipe(filterNil(), first())
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
    this.logger.debug('Unsubscribe Moralis events.');
    this.unsubscribeFromWeb3Deactivated?.();
    this.unsubscribeFromChainChanged?.();
    this.unsubscribeFromAccountChanged?.();
  }

  private updateUserAndAccount(
    loggedInUser?: Moralis.User<Moralis.Attributes>,
    account?: string
  ) {
    this.userSubject.next(loggedInUser as MoralisUser);
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

  // Token APIs

  getTokenAllowance$(
    parameters: GetTokenAllowanceParameters
  ): Observable<Erc20Allowance> {
    this.logger.info(
      `Getting ${shortenAddress(
        parameters.address
      )} allowance for ${shortenAddress(parameters.spender_address)}.`
    );
    return from(Moralis.Web3API.token.getTokenAllowance(parameters)).pipe(
      tap(resp =>
        this.logger.debug(`Moralis.Web3API.token.getTokenAllowance:`, resp)
      )
    );
  }

  setTokenAllowance$(
    contractAddress: string,
    spender: string,
    amount: string = Moralis.web3Library.constants.MaxUint256.toString()
  ) {
    this.logger.info(
      `Setting ${contractAddress} ${amount} allowance for ${spender}.`
    );
    return this.account$.pipe(
      concatMap(account => {
        if (account) {
          const options: Moralis.ExecuteFunctionOptions = {
            contractAddress,
            abi: Bep20Abi,
            functionName: 'approve',
            params: {
              _spender: spender,
              _value: amount,
            },
          };
          return from(
            // Had to force cast to TransactionResponse because Moralis typings are not correct...
            // they are using ethers Transaction type instead of TransactionResponse which doesn't
            // include wait() function. TransactionResponse extends Transaction type on ethers.js
            Moralis.executeFunction(
              options
            ) as unknown as Observable<TransactionResponse>
          ).pipe(concatMap((tx: TransactionResponse) => tx.wait()));
        } else {
          return throwError(() => new Error('No account available'));
        }
      })
    );
  }

  getTokenMetadata$(parameters: GetTokenMetadataParameters) {
    return from(Moralis.Web3API.token.getTokenMetadata(parameters)).pipe(
      tap(resp =>
        this.logger.debug(`Moralis.Web3API.token.getTokenMetadata:`, resp)
      )
    );
  }

  // Account APIs

  getNativeBalance$(parameters: GetNativeBalanceParameters) {
    return from(Moralis.Web3API.account.getNativeBalance(parameters)).pipe(
      tap(resp =>
        this.logger.debug(`Moralis.Web3API.account.getNativeBalance:`, resp)
      )
    );
  }

  getTokenBalances$(parameters: GetTokenBalancesParameters) {
    return from(Moralis.Web3API.account.getTokenBalances(parameters)).pipe(
      tap(resp =>
        this.logger.debug(`Moralis.Web3API.account.getTokenBalances:`, resp)
      )
    );
  }

  // Misc

  getCloudFunctionUrl(cloudFunctionName: string) {
    return `${this.env.web3.moralis.serverUrl}/functions/${cloudFunctionName}`;
  }
}
