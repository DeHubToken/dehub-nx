import { ModalProvider } from '@dehub/react/pcsuikit';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { LanguageProvider } from './contexts/Localization';
import { RefreshContextProvider } from './contexts/RefreshContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ToastsProvider } from './contexts/ToastsContext';
import store from './state';
import { getLibrary } from './utils/web3React';

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
    </Web3ReactProvider>
  );
};

export default Providers;
