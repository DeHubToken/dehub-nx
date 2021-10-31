import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';

import { Constants } from '@dehub/shared/config';
import { Contexts } from '@dehub/react/core';

import { getChainId } from './config/constants';
import { RefreshContextProvider } from './contexts/RefreshContext';
import { store } from './states';
import Lottery from './views/Lottery';

const appId = Constants[getChainId()].MORALIS_ID;
const serverUrl = Constants[getChainId()].MORALIS_SERVER;

export function App() {
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Provider store={store}>
        <Contexts.MoralisEthersProvider>
          <RefreshContextProvider>
            <Lottery />
          </RefreshContextProvider>
        </Contexts.MoralisEthersProvider>
      </Provider>
    </MoralisProvider>
  );
}

export default App;
