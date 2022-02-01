import {
  moralisProviderLocalStorageKey,
  MoralisWeb3ProviderType,
} from '@dehub/shared/models';
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
        const provider = window.localStorage.getItem(
          moralisProviderLocalStorageKey
        ) as MoralisWeb3ProviderType;

        // TODO: Ben why we need this? User will always see walletconnect login without requesting it
        // I think logout should clear the local storage item
        // enableWeb3({ provider });
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
