/* eslint-disable multiline-comment-style */
import React, { useEffect, useState, useCallback } from 'react';
import { useMoralis } from 'react-moralis';
import { Moralis } from 'moralis';
import {
  JsonRpcSigner,
  Web3Provider,
  ExternalProvider,
} from '@ethersproject/providers';

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
    const web3 = await Moralis.Web3.activeWeb3Provider?.activate();
    const provider = new Web3Provider(
      web3?.currentProvider as ExternalProvider
    );
    setAuthProvider(provider);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ethereum = (window as any).ethereum;
    const newChainId = await ethereum?.request({ method: 'eth_chainId' });
    setChainId(newChainId);

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
    if (isWeb3Enabled) {
      if (user) {
        activateProvider();
      } else {
        clearProvider();
      }
    } else {
      enableWeb3();
    }
  }, [isWeb3Enabled, enableWeb3, user, activateProvider, clearProvider]);

  useEffect(() => {
    Moralis.Web3.onAccountsChanged(([newAccount]) => {
      console.log('onAccountsChanged', newAccount);
      // if (!user || newAccount !== user.attributes.accounts[0]) {
      //   logout();
      //   return;
      // }
      setAccount(newAccount);
    });

    Moralis.Web3.onChainChanged(newChainId => {
      console.log('onChainChanged', newChainId);
      setChainId(newChainId);
    });
  }, [logout, user]);

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
      }}
    >
      {children}
    </MoralisEthersContext.Provider>
  );
};

export default MoralisEthersProvider;
