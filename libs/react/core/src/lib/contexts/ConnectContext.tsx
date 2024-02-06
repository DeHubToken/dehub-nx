import { NoBscProviderError } from '@binance-chain/bsc-connector';
import {
  DeHubConnectorNames,
  enableOptionsLocalStorageKey,
  MoralisConnectorNames,
  WalletConnectingMessage,
  WalletConnectingState,
  Web3ConnectorNames,
  Web3EnableOptions,
} from '@dehub/shared/model';
import { hexToDecimal } from '@dehub/shared/util/network/hex-to-decimal';
import {
  ethereumDisabled,
  getRandomRpcUrlByChainId,
  getWalletConnectQrModalOptions,
  isMoralisConnector,
  setupMetamaskNetwork,
} from '@dehub/shared/utils';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { type Moralis } from 'moralis-v1';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useMoralis } from 'react-moralis';
import { useToast } from '../hooks';
import { getWalletConnector } from '../utils/wallet';

interface ConnectContextValue {
  defaultChainId: number;
  chainId: number | null;
  account: string | null;
  web3: Web3Provider | null;
  isInitialized: boolean;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  walletConnectingState: WalletConnectingState;
  login: (
    connectorId: DeHubConnectorNames,
    magicLinkEmail?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const ConnectContext = createContext<undefined | ConnectContextValue>(
  undefined
);

interface ConnectProviderProps extends PropsWithChildren<unknown> {
  defaultChainId: number;
  magicLinkApiKey: string;
  walletConnectProjectId: string;
  legalPage: string;
}

const ConnectProvider: React.FC<ConnectProviderProps> = ({
  children,
  defaultChainId = 1,
  magicLinkApiKey,
  walletConnectProjectId,
  legalPage,
}) => {
  const [walletConnectingState, setWalletConnectingState] =
    useState<WalletConnectingState>(WalletConnectingState.INIT);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [web3Provider, setWeb3Provider] = useState<Web3Provider | null>(null);

  const {
    activate: web3Login,
    deactivate: web3Logout,
    library: web3Library,
  } = useWeb3React();
  const {
    authenticate: moralisLogin,
    logout: moralisLogout,
    account: moralisAccount,
    chainId: moralisChainId,
    web3: moralisLibrary,
    isInitialized: moralisInitialized,
  } = useMoralis();

  const { isToastEnabled, toastError } = useToast();

  const cleanConnectorStorage = useCallback(
    (connectorId: DeHubConnectorNames): void => {
      if (connectorId === MoralisConnectorNames.WalletConnect) {
        window.localStorage.removeItem('walletconnect');
      } else if (connectorId === Web3ConnectorNames.WalletLink) {
        window.localStorage.removeItem(
          '-walletlink:https://www.walletlink.org:version'
        );
        window.localStorage.removeItem(
          '-walletlink:https://www.walletlink.org:session:id'
        );
        window.localStorage.removeItem(
          '-walletlink:https://www.walletlink.org:session:secret'
        );
        window.localStorage.removeItem(
          '-walletlink:https://www.walletlink.org:session:linked'
        );
        window.localStorage.removeItem(
          '-walletlink:https://www.walletlink.org:AppVersion'
        );
        window.localStorage.removeItem(
          '-walletlink:https://www.walletlink.org:Addresses'
        );
        window.localStorage.removeItem(
          '-walletlink:https://www.walletlink.org:walletUsername'
        );
      }
      window.localStorage.removeItem(enableOptionsLocalStorageKey);
      console.log("HHH - cleanConnectorStorage");
    },
    []
  );

  const onSwitchNetwork = useCallback(() => {
    setWalletConnectingState(WalletConnectingState.SWITCH_NETWORK);
  }, []);
  const onAddNetwork = useCallback(() => {
    setWalletConnectingState(WalletConnectingState.ADD_NETWORK);
  }, []);

  const logout = useCallback(async () => {
    const enableOptions = JSON.parse(
      window.localStorage.getItem(enableOptionsLocalStorageKey) ?? '{}'
    ) as Web3EnableOptions;
    if (!enableOptions.provider) return;

    if (
      enableOptions.provider === MoralisConnectorNames.Injected ||
      enableOptions.provider === MoralisConnectorNames.WalletConnect ||
      enableOptions.provider === MoralisConnectorNames.MagicLink
    ) {
      await moralisLogout();
    } else {
      web3Logout();
      setAccount(null);
      setChainId(null);
    }
    // throw new Error("log out");
    console.log("HHH - logout");
    cleanConnectorStorage(enableOptions.provider as DeHubConnectorNames);
  }, [moralisLogout, web3Logout, cleanConnectorStorage]);

  const login = useCallback(
    async (connectorId: DeHubConnectorNames, magicLinkEmail?: string) => {
      cleanConnectorStorage(connectorId);

      setWalletConnectingState(WalletConnectingState.WAITING);
      window.localStorage.setItem(
        enableOptionsLocalStorageKey,
        JSON.stringify({
          provider: connectorId,
        })
      );

      if (isMoralisConnector(connectorId)) {
        if (
          connectorId === MoralisConnectorNames.Injected &&
          ethereumDisabled()
        ) {
          console.error(WalletConnectingMessage.UnsupportedProvider);
          if (isToastEnabled && toastError)
            toastError(
              WalletConnectingMessage.ConnectWallet,
              WalletConnectingMessage.UnsupportedProvider
            );

          logout();
          setWalletConnectingState(WalletConnectingState.NO_PROVIDER);
          return;
        }

        let enableOptions: Moralis.EnableOptions;
        if (connectorId === MoralisConnectorNames.Injected) {
          enableOptions = {
            provider: connectorId,
            chainId: defaultChainId,
          };
        } else if (connectorId === MoralisConnectorNames.WalletConnect) {
          enableOptions = {
            provider: connectorId,
            chainId: defaultChainId,
            newSession: true,
            projectId: walletConnectProjectId,
            qrModalOptions: getWalletConnectQrModalOptions(legalPage),
          };
        } else if (
          connectorId === MoralisConnectorNames.MagicLink &&
          magicLinkEmail
        ) {
          enableOptions = {
            provider: connectorId,
            network: {
              rpcUrl: getRandomRpcUrlByChainId(defaultChainId),
              chainId: defaultChainId,
            } as unknown as string,
            newSession: 'true',
            email: magicLinkEmail,
            apiKey: magicLinkApiKey,
          };
        } else {
          throw new Error(`Not supported provider: ${connectorId}!`);
        }

        // if moralis connector
        moralisLogin({
          ...enableOptions,
          signingMessage: 'DeHub DApp',
          onError: (error: Error) => {
            logout();
            setWalletConnectingState(WalletConnectingState.INIT);
          },
          onSuccess: async (loggedInUser: Moralis.User) => {
            if (connectorId === MoralisConnectorNames.WalletConnect) {
              console.log('Wallet Connect');
              setWalletConnectingState(WalletConnectingState.COMPLETE);
              // Not save new session into local storage
              delete (
                enableOptions as Moralis.WalletConnectWeb3ConnectorEnableOptions
              ).newSession;
            } else if (
              await setupMetamaskNetwork(
                defaultChainId,
                onSwitchNetwork,
                onAddNetwork,
                (success: boolean) => {
                  if (success) login(connectorId, magicLinkEmail);
                },
                (success: boolean) => {
                  if (success) login(connectorId, magicLinkEmail);
                }
              )
            ) {
              if (connectorId === MoralisConnectorNames.MagicLink) {
                // Save the email as Moralis not store MagicLink email after login
                loggedInUser.set('email', magicLinkEmail);
              }

              setWalletConnectingState(WalletConnectingState.COMPLETE);
              // Not save new session into local storage
              delete (enableOptions as Moralis.MagicWeb3ConnectorEnableOptions)
                .newSession;
            } else {
              logout();
              setWalletConnectingState(WalletConnectingState.INIT);
            }

            // Store enableOptions
            window.localStorage.setItem(
              enableOptionsLocalStorageKey,
              JSON.stringify(enableOptions)
            );
          },
        });
      } else {
        // if web3 react connector
        const connector = getWalletConnector(
          connectorId as Web3ConnectorNames,
          defaultChainId
        );

        connector &&
          web3Login(connector, undefined, true)
            .then(async () => {
              const account = await connector.getAccount();
              setAccount(account);
              const chainId = await connector.getChainId();
              setChainId(
                typeof chainId === 'string' ? parseInt(chainId, 16) : chainId
              );
              setWalletConnectingState(WalletConnectingState.COMPLETE);
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch(async (error: any) => {
              if (error instanceof UnsupportedChainIdError) {
                if (
                  await setupMetamaskNetwork(
                    defaultChainId,
                    onSwitchNetwork,
                    onAddNetwork,
                    () => null,
                    (success: boolean) => {
                      if (success) login(connectorId);
                    }
                  )
                ) {
                  setWalletConnectingState(WalletConnectingState.COMPLETE);
                } else {
                  logout();
                  setWalletConnectingState(WalletConnectingState.INIT);
                }
              } else if (
                connectorId === Web3ConnectorNames.BSC &&
                error instanceof NoBscProviderError
              ) {
                console.error('Provider not supported');
                if (isToastEnabled && toastError)
                  toastError('Wallet Connect', 'Provider not supported');
                logout();
                setWalletConnectingState(WalletConnectingState.NO_PROVIDER);
              } else {
                logout();
                setWalletConnectingState(WalletConnectingState.INIT);
              }
            });
      }
    },
    [
      web3Login,
      moralisLogin,
      logout,
      isToastEnabled,
      toastError,
      onAddNetwork,
      onSwitchNetwork,
      cleanConnectorStorage,
      defaultChainId,
      magicLinkApiKey,
      walletConnectProjectId,
      legalPage,
    ]
  );

  useEffect(() => {
    const enableOptions = JSON.parse(
      window.localStorage.getItem(enableOptionsLocalStorageKey) ?? '{}'
    ) as unknown as Web3EnableOptions;
    if (!enableOptions.provider) return;

    if (
      enableOptions.provider === MoralisConnectorNames.Injected ||
      enableOptions.provider === MoralisConnectorNames.WalletConnect ||
      enableOptions.provider === MoralisConnectorNames.MagicLink
    ) {
      setAccount(moralisAccount);
      setChainId(moralisChainId ? hexToDecimal(moralisChainId) : null);
    }
  }, [moralisAccount, moralisChainId]);

  useEffect(() => {
    const enableOptions = JSON.parse(
      window.localStorage.getItem(enableOptionsLocalStorageKey) ?? '{}'
    ) as unknown as Web3EnableOptions;
    if (!enableOptions.provider) return;

    if (
      enableOptions.provider === MoralisConnectorNames.Injected ||
      enableOptions.provider === MoralisConnectorNames.WalletConnect ||
      enableOptions.provider === MoralisConnectorNames.MagicLink
    ) {
      setWeb3Provider(moralisLibrary);
    } else {
      setWeb3Provider(web3Library);
    }
  }, [web3Library, moralisLibrary]);

  return (
    <ConnectContext.Provider
      value={{
        defaultChainId,
        chainId,
        account,
        web3: web3Provider,
        isAuthenticating:
          walletConnectingState === WalletConnectingState.WAITING,
        isAuthenticated:
          walletConnectingState === WalletConnectingState.COMPLETE,
        walletConnectingState,
        isInitialized: moralisInitialized,
        login,
        logout,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export { ConnectContext, ConnectProvider };
