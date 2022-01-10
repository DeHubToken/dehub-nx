import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { Contexts } from '@dehub/react/core';
import { ModalProvider } from '@dehub/react/pcsuikit';

import { ThemeContextProvider } from './contexts/ThemeContext';
import { ToastsProvider } from './contexts/ToastsContext';
import { store } from './states';

const Providers: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastsProvider>
        <HelmetProvider>
          <ThemeContextProvider>
            <Contexts.RefreshContextProvider>
              <ModalProvider>{children}</ModalProvider>
            </Contexts.RefreshContextProvider>
          </ThemeContextProvider>
        </HelmetProvider>
      </ToastsProvider>
    </Provider>
  );
};

export default Providers;
