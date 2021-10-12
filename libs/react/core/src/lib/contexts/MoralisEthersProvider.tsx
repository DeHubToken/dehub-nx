import React, { useState, useCallback } from 'react';
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
  const [authProvider, setAuthProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const activateProvider = useCallback(async () => {
    const web3 = await Moralis.Web3.activeWeb3Provider?.activate();
    const provider = new ethers.providers.Web3Provider(
      web3?.currentProvider as ExternalProvider
    );
    setAuthProvider(provider);

    const signerT = provider.getSigner();
    setSigner(signerT);
    setAccount(await signerT.getAddress());
  }, []);

  const { isAuthenticated } = useMoralis();

  return (
    <MoralisEthersContext.Provider
      value={{
        authProvider,
        signer,
        activateProvider,
        account,
        isAuthenticated,
      }}
    >
      {children}
    </MoralisEthersContext.Provider>
  );
};

export default MoralisEthersProvider;
