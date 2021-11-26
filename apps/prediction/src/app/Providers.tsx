import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { Contexts } from '@dehub/react/core';
import { ModalProvider } from '@dehub/react/pcsuikit';

import { LanguageProvider } from './contexts/Localization';
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
              <Contexts.RefreshContextProvider>
                <ModalProvider>{children}</ModalProvider>
              </Contexts.RefreshContextProvider>
            </LanguageProvider>
          </ThemeContextProvider>
        </HelmetProvider>
      </ToastsProvider>
    </Provider>
  );
};

export default Providers;
