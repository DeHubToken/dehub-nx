import { ConnectProvider, RefreshContextProvider } from '@dehub/react/core';
import { ModalProvider } from '@dehub/react/pcsuikit';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';
import { environment } from '../environments/environment';
import { LanguageProvider } from './contexts/Localization';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ToastsProvider } from './contexts/ToastsContext';
import store from './state';

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
        <ToastsProvider>
          <HelmetProvider>
            <ThemeContextProvider>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ConnectProvider
                    defaultChainId={chainId}
                    baseUrl={baseUrl}
                    pageTitle={'DeHub Staking'}
                    landingUrl={landing}
                  >
                    <ModalProvider>{children}</ModalProvider>
                  </ConnectProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeContextProvider>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </MoralisProvider>
  );
};

export default Providers;
