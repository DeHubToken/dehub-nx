import { RefreshContextProvider } from '@dehub/react/core';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';
import { environment } from '../environments/environment';
import store from './state';

const { appId, serverUrl } = environment.moralis;

const Providers: React.FC = ({ children }) => {
  return (
    <MoralisProvider
      appId={appId}
      serverUrl={serverUrl}
      initializeOnMount={true}
    >
      <Provider store={store}>
        <RefreshContextProvider>
          <HelmetProvider>{children}</HelmetProvider>
        </RefreshContextProvider>
      </Provider>
    </MoralisProvider>
  );
};

export default Providers;
