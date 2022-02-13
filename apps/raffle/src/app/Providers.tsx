import { ConnectProvider, RefreshContextProvider } from '@dehub/react/core';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';
import { environment } from '../environments/environment';
import { store } from './states';

const { landing } = environment.dehub;
const { appId, serverUrl } = environment.moralis;
const { chainId } = environment.web3;
const { baseUrl } = environment;

const Providers: React.FC = ({ children }) => {
  return (
    <MoralisProvider
      appId={appId}
      serverUrl={serverUrl}
      initializeOnMount={true}
    >
      <Provider store={store}>
        <RefreshContextProvider>
          <ConnectProvider
            defaultChainId={chainId}
            baseUrl={baseUrl}
            pageTitle={'DeHub Staking'}
            landingUrl={landing}
          >
            <HelmetProvider>{children}</HelmetProvider>
          </ConnectProvider>
        </RefreshContextProvider>
      </Provider>
    </MoralisProvider>
  );
};

export default Providers;
