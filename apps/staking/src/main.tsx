import { Contexts } from '@dehub/react/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';
import App from './app/app';
import Providers from './app/Providers';
import { environment } from './environments/environment';

const appId = environment.moralis.appId;
const serverUrl = environment.moralis.serverUrl;

ReactDOM.render(
  <StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Providers>
        <Contexts.MoralisEthersProvider>
          <App />
        </Contexts.MoralisEthersProvider>
      </Providers>
    </MoralisProvider>
  </StrictMode>,
  document.getElementById('root')
);
