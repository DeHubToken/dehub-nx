import { Web3Env } from '@dehub/shared/config';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { PropsWithChildren, useCallback } from 'react';
import { MoralisProvider } from 'react-moralis';
import { ConnectProvider } from './ConnectContext';

interface Web3ProviderProps extends PropsWithChildren<unknown> {
  web3: Web3Env;
}

export const Web3Providers: React.FC<Web3ProviderProps> = ({
  children,
  web3,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLibrary = useCallback((provider: any) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }, []);

  return (
    <MoralisProvider
      appId={web3.moralis.appId}
      serverUrl={web3.moralis.serverUrl}
      initializeOnMount={true}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectProvider
          defaultChainId={web3.chainId}
          magicLinkApiKey={web3.auth.magicLinkApiKey}
        >
          {children}
        </ConnectProvider>
      </Web3ReactProvider>
    </MoralisProvider>
  );
};
