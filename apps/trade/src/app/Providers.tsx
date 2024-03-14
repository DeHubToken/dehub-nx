import {
  ContentfulProvider,
  EnvironmentProvider,
  RefreshContextProvider,
  ToastProvider,
  Web3Providers
} from '@dehub/react/core';
import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { environment } from '../environments/environment';
import store from "./states";

const Providers: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const {
    baseUrl,
    web3,
    contentful,
    dehub: { landing },
  } = environment;
  const legalPage = `${landing}${baseUrl}`;
  return (
    <ToastProvider>
      <Web3Providers web3={web3} legalPage={legalPage}>
        <Provider store={store}>
          <EnvironmentProvider baseUrl={baseUrl}>
            <ContentfulProvider contentful={contentful}>
              <RefreshContextProvider>
                <HelmetProvider>{children}</HelmetProvider>
              </RefreshContextProvider>
            </ContentfulProvider>
          </EnvironmentProvider>
        </Provider>
      </Web3Providers>
    </ToastProvider>
  );
};

export default Providers;
