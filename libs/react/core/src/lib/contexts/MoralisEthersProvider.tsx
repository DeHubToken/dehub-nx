/* eslint-disable multiline-comment-style */
import React, { useEffect, useState, useCallback } from 'react';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
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

  const activateProvider = useCallback(async () => {
    const web3 = await Moralis.Web3.activeWeb3Provider?.activate();
    const provider = new Web3Provider(
      web3?.currentProvider as ExternalProvider
    );
    setAuthProvider(provider);

    const signerT = provider.getSigner();
    setSigner(signerT);
    const address = await signerT.getAddress();
    setAccount(address);
  }, []);

  const { isWeb3Enabled, isAuthenticated, authenticate, user, logout } =
    useMoralis();

  useEffect(() => {
    const enable = async () => {
      if (!isWeb3Enabled) {
        await Moralis.Web3.enable();
        await activateProvider();
      }
    };
    enable();
  }, [isWeb3Enabled, activateProvider]);

  useEffect(() => {
    Moralis.Web3.onAccountsChanged(([newAccount]) => {
      console.log('onAccountsChanged', newAccount, user);
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
  }, [logout, user, activateProvider]);

  return (
    <MoralisEthersContext.Provider
      value={{
        isAuthenticated,
        authProvider,
        signer,
        account,
        chainId,
        activateProvider,
        authenticate,
        logout,
      }}
    >
      {children}
    </MoralisEthersContext.Provider>
  );
};

export default MoralisEthersProvider;
