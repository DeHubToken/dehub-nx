import { ModalProvider } from '@dehub/react/pcsuikit';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { LanguageProvider } from './contexts/Localization';
import { RefreshContextProvider } from './contexts/RefreshContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ToastsProvider } from './contexts/ToastsContext';
import store from './state';

const Providers: React.FC = ({ children }) => {
  return (
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
  );
};

export default Providers;
