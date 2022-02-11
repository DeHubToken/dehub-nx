import {
  moralisProviderLocalStorageKey,
  MoralisWeb3ProviderType,
} from '@dehub/shared/model';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export function useEagerMoralis() {
  const {
    enableWeb3,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    isAuthenticating,
    web3,
  } = useMoralis();

  useEffect(() => {
    const enable = async () => {
      if (
        isAuthenticated &&
        !isAuthenticating &&
        !isWeb3Enabled &&
        !isWeb3EnableLoading &&
        web3
      ) {
        const provider = window.localStorage.getItem(
          moralisProviderLocalStorageKey
        ) as MoralisWeb3ProviderType;
        if (provider && web3) enableWeb3({ provider });
      }
    };

    enable();
  }, [
    enableWeb3,
    isAuthenticated,
    isAuthenticating,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3,
  ]);
}
