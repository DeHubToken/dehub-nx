import { NoBscProviderError } from '@binance-chain/bsc-connector';
import { Networks } from '@dehub/shared/config';
import {
  DeHubConnectorNames,
  enableOptionsLocalStorageKey,
  MoralisConnectorNames,
  WalletConnectingState,
  Web3ConnectorNames,
  Web3EnableOptions,
} from '@dehub/shared/model';
import { hexToDecimal } from '@dehub/shared/util/network/hex-to-decimal';
import { getRandomRpcUrl, setupMetamaskNetwork } from '@dehub/shared/utils';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Moralis } from 'moralis';
import {
  createContext,
  ReactNode,
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

interface ConnectProviderProps {
  children?: ReactNode;
  defaultChainId: number;
  fortmatic: string;
  magicLinkApiKey: string;
}

const ConnectProvider = ({
  children,
  defaultChainId: _defaultChainId = 1,
  fortmatic,
  magicLinkApiKey,
}: ConnectProviderProps) => {
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
      window.localStorage.getItem(enableOptionsLocalStorageKey) ?? ''
    ) as Web3EnableOptions;

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

      if (
        connectorId === MoralisConnectorNames.Injected ||
        connectorId === MoralisConnectorNames.WalletConnect ||
        connectorId === MoralisConnectorNames.MagicLink
      ) {
        if (connectorId === MoralisConnectorNames.Injected) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const ethereum = (window as any).ethereum;
          if (!ethereum) {
            console.error('Provider not supported');
            setWalletConnectingState(WalletConnectingState.NO_PROVIDER);

            if (isToastEnabled && toastError)
              toastError('Wallet Connect', 'Provider not supported');
            return;
          }
        }

        let enableOptions: Moralis.EnableOptions;
        if (
          connectorId === MoralisConnectorNames.Injected ||
          connectorId === MoralisConnectorNames.WalletConnect
        ) {
          enableOptions = {
            provider: connectorId,
            chainId: _defaultChainId,
          };
        } else if (connectorId === MoralisConnectorNames.MagicLink) {
          enableOptions = {
            provider: connectorId,
            network: {
              rpcUrl: getRandomRpcUrl(Networks[_defaultChainId].nodes),
              chainId: _defaultChainId,
            } as unknown as string,
            email: magicLinkEmail,
            apiKey: magicLinkApiKey,
          };
        } else {
          throw new Error(`Not supported provider: ${connectorId}!`);
        }

        window.localStorage.setItem(
          enableOptionsLocalStorageKey,
          JSON.stringify(enableOptions)
        );

        // if moralis connector
        moralisLogin({
          ...enableOptions,
          signingMessage: 'DeHub D’App',
          onError: (error: Error) => {
            setWalletConnectingState(WalletConnectingState.INIT);
          },
          onSuccess: async () => {
            if (
              await setupMetamaskNetwork(
                _defaultChainId,
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
              setWalletConnectingState(WalletConnectingState.COMPLETE);
            } else {
              logout();
              setWalletConnectingState(WalletConnectingState.INIT);
            }
          },
        });
      } else {
        // if web3 react connector
        const connector = getWalletConnector(
          connectorId as Web3ConnectorNames,
          _defaultChainId,
          fortmatic
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
                    _defaultChainId,
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
      _defaultChainId,
      fortmatic,
      magicLinkApiKey,
    ]
  );

  useEffect(() => {
    const enableOptions = JSON.parse(
      window.localStorage.getItem(enableOptionsLocalStorageKey) ?? '{}'
    ) as unknown as Web3EnableOptions;

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
        defaultChainId: _defaultChainId,
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
