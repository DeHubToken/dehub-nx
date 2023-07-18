import {
  ContentfulProvider,
  RefreshContextProvider,
  ToastProvider,
  Web3Providers,
} from '@dehub/react/core';
import React, { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { environment } from '../environments/environment';
import store from './state';

const Providers: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const {
    web3,
    contentful,
    dehub: { landing },
  } = environment;
  return (
    <ToastProvider>
      <Web3Providers web3={web3} landing={landing}>
        <Provider store={store}>
          <ContentfulProvider contentful={contentful}>
            <RefreshContextProvider>
              <HelmetProvider>{children}</HelmetProvider>
            </RefreshContextProvider>
          </ContentfulProvider>
        </Provider>
      </Web3Providers>
    </ToastProvider>
  );
};

export default Providers;
