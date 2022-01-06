/* eslint-disable multiline-comment-style */
import {
  ExternalProvider,
  JsonRpcSigner,
  Web3Provider,
} from '@ethersproject/providers';
import { Moralis } from 'moralis';
import React, { useCallback, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { MoralisEthersContext } from './MoralisEthersContext';

export interface MoralisEthersProviderProps {
  children: React.ReactNode;
}

export const MoralisEthersProvider = ({
  children,
}: MoralisEthersProviderProps) => {
  const [authProvider, setAuthProvider] = useState<Web3Provider | undefined>(
    undefined
  );
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<string | undefined>(undefined);

  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    authenticate,
    user,
    logout,
  } = useMoralis();

  const activateProvider = useCallback(async () => {
    // if (!newWeb3 || !newWeb3?.currentProvider) return;
    const newWeb3 = await Moralis.Web3.activeWeb3Provider?.activate();
    const provider = new Web3Provider(
      newWeb3?.currentProvider as ExternalProvider
    );

    setAuthProvider(provider);

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const ethereum = (window as any).ethereum;
    // const newChainId = await ethereum?.request({ method: 'eth_chainId' });
    // setChainId(newChainId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newChainId = (provider.provider as any).chainId;
    if (newChainId) {
      setChainId(`0x${newChainId.toString(16)}`);
    }

    const signerT = provider.getSigner();
    setSigner(signerT);

    const address = await signerT.getAddress();
    setAccount(address);
  }, []);

  const clearProvider = useCallback(() => {
    setAuthProvider(undefined);
    setSigner(undefined);
    setAccount(undefined);
  }, []);

  useEffect(() => {
    const onSuccess = (web3: Moralis.Web3 | null) => {
      activateProvider();
    };
    const onError = (error: Error) => {
      clearProvider();
    };

    if (user) {
      if (!isWeb3Enabled) {
        const savedProviderName = window.localStorage.getItem(
          'providerName'
        ) as 'wc' | 'walletconnect';
        enableWeb3({
          ...(savedProviderName !== null && { provider: savedProviderName }),
          onSuccess,
          onError,
        });
      }
    }
  }, [user, isWeb3Enabled, enableWeb3, activateProvider, clearProvider]);

  useEffect(() => {
    Moralis.Web3.onAccountsChanged(([newAccount]) => {
      /*
       * if (!user || newAccount !== user.attributes.accounts[0]) {
       *   logout();
       *   return;
       * }
       */
      if (user) {
        if (newAccount) {
          activateProvider();
        } else {
          logout();
        }
      }
    });
  }, [logout, user, activateProvider]);

  return (
    <MoralisEthersContext.Provider
      value={{
        isAuthenticated,
        authProvider,
        signer,
        account,
        chainId,
        authenticate,
        logout,
        activateProvider,
        clearProvider,
      }}
    >
      {children}
    </MoralisEthersContext.Provider>
  );
};

export default MoralisEthersProvider;
