import { StrictMode } from 'react';
import { MoralisProvider } from 'react-moralis';
import { Constants } from '@dehub/shared/config';
import Providers from './app/Providers';
import { getChainId } from './app/config/constants';

import * as ReactDOM from 'react-dom';

import App from './app/app';

const appId = Constants[getChainId()].MORALIS_ID;
const serverUrl = Constants[getChainId()].MORALIS_SERVER;

ReactDOM.render(
  <StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Providers>
        <App />
      </Providers>
    </MoralisProvider>
  </StrictMode>,
  document.getElementById('root')
);
