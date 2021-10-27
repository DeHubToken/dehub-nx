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
    web3,
    isAuthenticated,
    authenticate,
    user,
    logout,
  } = useMoralis();

  const activateProvider = useCallback(async (newWeb3: Moralis.Web3 | null) => {
    if (!newWeb3 || !newWeb3?.currentProvider) return;
    // const web3 = await Moralis.Web3.activeWeb3Provider?.activate();
    const provider = new Web3Provider(
      newWeb3?.currentProvider as ExternalProvider
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
    const onSuccess = (web3: Moralis.Web3 | null) => {
      activateProvider(web3);
    };
    const onError = (error: Error) => {
      clearProvider();
    };

    if (user) {
      const savedProviderName = window.localStorage.getItem('providerName');
      enableWeb3({
        provider: savedProviderName,
        onSuccess,
        onError,
      });
    } else {
      clearProvider();
    }
  }, [user, enableWeb3, activateProvider, clearProvider]);

  useEffect(() => {
    Moralis.Web3.onAccountsChanged(([newAccount]) => {
      /*
       * if (!user || newAccount !== user.attributes.accounts[0]) {
       *   logout();
       *   return;
       * }
       */
      if (user) {
        setAccount(newAccount);
      }
    });

    Moralis.Web3.onChainChanged(newChainId => {
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
