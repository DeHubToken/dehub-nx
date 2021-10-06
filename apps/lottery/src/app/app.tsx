import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux'

import { Constants } from '@dehub/shared/config';
import {
  Components,
  Contexts,
  States
} from '@dehub/shared/react';

import { getChainId } from './constants';
import Lottery from './views/Lottery';

const appId = Constants[getChainId()].MORALIS_ID;
const serverUrl = Constants[getChainId()].MORALIS_SERVER;

export function App() {
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Provider store={States.store}>
        <Contexts.MoralisEthersProvider>
          <Components.MoralisReactManager>
            <Lottery />
          </Components.MoralisReactManager>
        </Contexts.MoralisEthersProvider>
      </Provider>
    </MoralisProvider>
  );
}

export default App;
