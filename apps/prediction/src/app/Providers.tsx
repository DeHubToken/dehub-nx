import { RefreshContextProvider } from '@dehub/react/core';
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

const { appId, serverUrl } = environment.moralis;

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
                  <ModalProvider>{children}</ModalProvider>
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
