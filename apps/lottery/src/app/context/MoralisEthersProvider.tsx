import React, { useState, useCallback } from 'react';
import { useMoralis } from 'react-moralis';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { Moralis } from 'moralis';
import { MoralisEthersContext } from './MoralisEthersContext';

export interface MoralisEthersProviderProps {
  children: React.ReactNode;
}

const MoralisEthersProvider = ({ children }: MoralisEthersProviderProps) => {
  const [authProvider, setAuthProvider] = useState<Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const activateProvider = useCallback(
    async () => {
      const web3 = await Moralis.Web3.activeWeb3Provider?.activate();
      const provider = new ethers.providers.Web3Provider(web3?.currentProvider as ExternalProvider);
      setAuthProvider(provider);

      const signer = provider.getSigner();
      setAccount(await signer.getAddress());
    },
    [],
  );

  const {
    isAuthenticated
  } = useMoralis();

  return (
    <MoralisEthersContext.Provider
      value={{
        authProvider,
        activateProvider,
        account,
        isAuthenticated
      }}
    >
      {children}
    </MoralisEthersContext.Provider>
  );
}

export default MoralisEthersProvider;