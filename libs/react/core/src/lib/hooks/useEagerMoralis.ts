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
        console.log('enableWeb3', provider);
        enableWeb3({ provider });
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
