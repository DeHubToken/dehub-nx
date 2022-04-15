import {
  DeHubConnectorNames,
  MoralisConnectorNames,
  MoralisWeb3ProviderType,
  providerLocalStorageKey,
  WalletConnectingState,
  Web3ConnectorNames,
} from '@dehub/shared/model';
import { hexToDecimal } from '@dehub/shared/util/network/hex-to-decimal';
import { setupMetamaskNetwork } from '@dehub/shared/utils';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useMoralis } from 'react-moralis';
import { getWalletConnector } from '../utils/wallet';

interface ConnectContextValue {
  defaultChainId: number;
  chainId: number | null;
  account: string | null;
  web3: Web3Provider | null;
  isInitialized: boolean;
  isAuthenticating: boolean;
  walletConnectingState: WalletConnectingState;
  // setWalletConnectingState: (connectingState: WalletConnectingState) => void;
  login: (connectorId: DeHubConnectorNames) => Promise<void>;
  logout: () => Promise<void>;
}

const ConnectContext = createContext<undefined | ConnectContextValue>(
  undefined
);

interface ConnectProviderProps {
  children?: ReactNode;
  defaultChainId: number;
  fortmatic: string;
}

const ConnectProvider = ({
  children,
  defaultChainId: _defaultChainId = 1,
  fortmatic,
}: ConnectProviderProps) => {
  const [walletConnectingState, setWalletConnectingState] =
    useState<WalletConnectingState>(WalletConnectingState.INIT);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [web3Provider, setWeb3Provider] = useState<Web3Provider | null>(null);
  const [isInitialized, setInitialized] = useState<boolean>(false);

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
      } else if (connectorId === Web3ConnectorNames.Torus) {
        window.localStorage.removeItem('loglevel:torus.js');
        window.localStorage.removeItem('loglevel:torus-embed');
        window.localStorage.removeItem('loglevel:http-helpers');
      }
      window.localStorage.removeItem(providerLocalStorageKey);
    },
    []
  );

  const onSwitchNetwork = useCallback(() => {
    setWalletConnectingState(WalletConnectingState.SWITCH_NETWORK);
  }, []);
  const onAddNetwork = useCallback(() => {
    setWalletConnectingState(WalletConnectingState.ADD_NETWORK);
  }, []);

  const login = useCallback(
    async (connectorId: DeHubConnectorNames) => {
      cleanConnectorStorage(connectorId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        console.error('Provider not supported');
        setWalletConnectingState(WalletConnectingState.NO_PROVIDER);
        return;
      }

      setWalletConnectingState(WalletConnectingState.WAITING);
      window.localStorage.setItem(providerLocalStorageKey, connectorId);

      if (
        connectorId === MoralisConnectorNames.Injected ||
        connectorId === MoralisConnectorNames.WalletConnect
      ) {
        // if moralis connector
        moralisLogin({
          chainId: _defaultChainId,
          provider: connectorId as MoralisWeb3ProviderType,
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
                  if (success) login(connectorId);
                },
                (success: boolean) => {
                  if (success) login(connectorId);
                }
              )
            ) {
              setWalletConnectingState(WalletConnectingState.COMPLETE);
            } else {
              moralisLogout();
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
            .catch(async error => {
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
                  web3Logout();
                  setWalletConnectingState(WalletConnectingState.INIT);
                }
              } else {
                web3Logout();
                setWalletConnectingState(WalletConnectingState.INIT);
              }
            });
      }
    },
    [
      web3Login,
      web3Logout,
      moralisLogin,
      moralisLogout,
      onAddNetwork,
      onSwitchNetwork,
      cleanConnectorStorage,
      _defaultChainId,
      fortmatic,
    ]
  );

  const logout = useCallback(async () => {
    const connectorId = window.localStorage.getItem(providerLocalStorageKey);

    if (
      connectorId === MoralisConnectorNames.Injected ||
      connectorId === MoralisConnectorNames.WalletConnect
    ) {
      await moralisLogout();
    } else {
      web3Logout();
    }
    cleanConnectorStorage(connectorId as DeHubConnectorNames);
  }, [moralisLogout, web3Logout, cleanConnectorStorage]);

  useEffect(() => {
    const connectorId = window.localStorage.getItem(providerLocalStorageKey);

    if (
      connectorId === MoralisConnectorNames.Injected ||
      connectorId === MoralisConnectorNames.WalletConnect
    ) {
      setAccount(moralisAccount);
      setChainId(moralisChainId ? hexToDecimal(moralisChainId) : null);
    }
  }, [moralisAccount, moralisChainId]);

  useEffect(() => {
    const connectorId = window.localStorage.getItem(providerLocalStorageKey);
    if (
      connectorId === MoralisConnectorNames.Injected ||
      connectorId === MoralisConnectorNames.WalletConnect
    ) {
      setInitialized(moralisInitialized);
    }
  }, [moralisInitialized]);

  useEffect(() => {
    const connectorId = window.localStorage.getItem(providerLocalStorageKey);
    if (
      connectorId === MoralisConnectorNames.Injected ||
      connectorId === MoralisConnectorNames.WalletConnect
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
          walletConnectingState === WalletConnectingState.WAITING
            ? true
            : false,
        walletConnectingState,
        isInitialized,
        login,
        logout,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export { ConnectContext, ConnectProvider };
