import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { useCallback } from 'react';
import { MoralisProvider } from 'react-moralis';
import { ConnectProvider } from './ConnectContext';

interface MoralisProps {
  /** Application ID */
  appId: string;
  /** Server URL */
  serverUrl: string;
}

interface Web3Props {
  chainId: number;
  fortmatic: string;
}

interface Web3ProviderProps {
  children?: React.ReactNode;
  moralis: MoralisProps;
  web3: Web3Props;
}

export const Web3Providers = ({
  children,
  moralis,
  web3,
}: Web3ProviderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLibrary = useCallback((provider: any) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }, []);

  return (
    <MoralisProvider
      appId={moralis.appId}
      serverUrl={moralis.serverUrl}
      initializeOnMount={true}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectProvider
          defaultChainId={web3.chainId}
          fortmatic={web3.fortmatic}
        >
          {children}
        </ConnectProvider>
      </Web3ReactProvider>
    </MoralisProvider>
  );
};
