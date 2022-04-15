import {
  DeHubConnectorNames,
  MoralisConnectorNames,
  providerLocalStorageKey,
} from '@dehub/shared/model';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export function useEagerWeb3() {
  const {
    enableWeb3,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    isAuthenticating,
  } = useMoralis();

  useEffect(() => {
    const enable = async () => {
      const connectorId = window.localStorage.getItem(
        providerLocalStorageKey
      ) as DeHubConnectorNames;

      if (
        connectorId === MoralisConnectorNames.Injected ||
        connectorId === MoralisConnectorNames.WalletConnect
      ) {
        if (
          isAuthenticated &&
          !isAuthenticating &&
          !isWeb3Enabled &&
          !isWeb3EnableLoading
        ) {
          enableWeb3({ provider: connectorId });
        }
      }
    };

    enable();
  }, [
    enableWeb3,
    isAuthenticated,
    isAuthenticating,
    isWeb3Enabled,
    isWeb3EnableLoading,
  ]);
}
