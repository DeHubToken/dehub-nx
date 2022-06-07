import {
  ContentfulProvider,
  RefreshContextProvider,
  ToastProvider,
  Web3Providers,
} from '@dehub/react/core';
import { ModalProvider } from '@dehub/react/pcsuikit';
import React, { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { environment } from '../environments/environment';
import { LanguageProvider } from './contexts/Localization';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ToastsProvider as PcsToastsProvider } from './contexts/ToastsContext';
import store from './state';

const Providers: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ToastProvider>
      <Web3Providers moralis={environment.moralis} web3={environment.web3}>
        <Provider store={store}>
          <ContentfulProvider contentful={environment.contentful}>
            <PcsToastsProvider>
              <HelmetProvider>
                <ThemeContextProvider>
                  <LanguageProvider>
                    <RefreshContextProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </RefreshContextProvider>
                  </LanguageProvider>
                </ThemeContextProvider>
              </HelmetProvider>
            </PcsToastsProvider>
          </ContentfulProvider>
        </Provider>
      </Web3Providers>
    </ToastProvider>
  );
};

export default Providers;
