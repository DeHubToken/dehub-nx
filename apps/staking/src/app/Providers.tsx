import { RefreshContextProvider, Web3Providers } from '@dehub/react/core';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { environment } from '../environments/environment';
import store from './state';

const Providers: React.FC = ({ children }) => {
  return (
    <Web3Providers moralis={environment.moralis} web3={environment.web3}>
      <Provider store={store}>
        <RefreshContextProvider>
          <HelmetProvider>{children}</HelmetProvider>
        </RefreshContextProvider>
      </Provider>
    </Web3Providers>
  );
};

export default Providers;
