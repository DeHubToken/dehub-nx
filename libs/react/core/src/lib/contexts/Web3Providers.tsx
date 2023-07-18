import { Web3Env } from '@dehub/shared/model';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { PropsWithChildren, useCallback } from 'react';
import { MoralisProvider } from 'react-moralis';
import { ConnectProvider } from './ConnectContext';

interface Web3ProviderProps extends PropsWithChildren<unknown> {
  web3: Web3Env;
  landing: string;
}

export const Web3Providers: React.FC<Web3ProviderProps> = ({
  children,
  web3,
  landing,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLibrary = useCallback((provider: any) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }, []);

  const {
    chainId,
    auth: { walletConnectProjectId, magicLinkApiKey },
  } = web3;

  return (
    <MoralisProvider
      appId={web3.moralis.appId}
      serverUrl={web3.moralis.serverUrl}
      initializeOnMount={true}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectProvider
          defaultChainId={chainId}
          magicLinkApiKey={magicLinkApiKey}
          walletConnectProjectId={walletConnectProjectId}
          landing={landing}
        >
          {children}
        </ConnectProvider>
      </Web3ReactProvider>
    </MoralisProvider>
  );
};
