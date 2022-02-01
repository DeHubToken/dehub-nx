import { ProviderTypes } from '@dehub/shared/models';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export default function useEagerMoralis() {
  const {
    enableWeb3,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    isAuthenticating,
  } = useMoralis();

  useEffect(() => {
    const enable = async () => {
      if (
        isAuthenticated &&
        !isAuthenticating &&
        !isWeb3Enabled &&
        !isWeb3EnableLoading
      ) {
        const savedProviderName = window.localStorage.getItem(
          'connectorId'
        ) as ProviderTypes;
        enableWeb3({
          provider: savedProviderName,
        });
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
