import { HelmetProvider } from 'react-helmet-async';
import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';
import { ModalProvider } from '@dehub/react/pcsuikit';
import { Contexts } from '@dehub/react/core';

import { RefreshContextProvider } from './contexts/RefreshContext';
import { store } from './states';
import Staking from './views/Staking';
import { environment } from '../environments/environment';
import { ToastsProvider } from './contexts/ToastsContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

const appId = environment.moralis.id;
const serverUrl = environment.moralis.server;

export function App() {
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeContextProvider>
              <RefreshContextProvider>
                <Contexts.MoralisEthersProvider>
                  <ModalProvider>
                    <Staking />
                  </ModalProvider>
                </Contexts.MoralisEthersProvider>
              </RefreshContextProvider>
            </ThemeContextProvider>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </MoralisProvider>
  );
}

export default App;
