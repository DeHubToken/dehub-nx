import {
  enableOptionsLocalStorageKey,
  MoralisConnectorNames,
} from '@dehub/shared/model';
import { type Moralis } from 'moralis-v1';
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
      const enableOptionsStr = window.localStorage.getItem(
        enableOptionsLocalStorageKey
      );

      if (enableOptionsStr) {
        const enableOptions = JSON.parse(
          enableOptionsStr
        ) as Moralis.EnableOptions;

        if (
          enableOptions.provider === MoralisConnectorNames.Injected ||
          enableOptions.provider === MoralisConnectorNames.WalletConnect ||
          enableOptions.provider === MoralisConnectorNames.MagicLink
        ) {
          if (
            isAuthenticated &&
            !isAuthenticating &&
            !isWeb3Enabled &&
            !isWeb3EnableLoading
          ) {
            enableWeb3(enableOptions);
          }
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
