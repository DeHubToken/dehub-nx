import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux'
import store from './state'

import { Constants } from '@dehub/shared/config';
import MoralisReactManager from './components/MoralisReactManager';
import MoralisEthersProvider from './context/MoralisEthersProvider';
import { getChainId } from './constants';
import Lottery from './views/Lottery';

const appId = Constants[getChainId()].MORALIS_ID;
const serverUrl = Constants[getChainId()].MORALIS_SERVER;

export function App() {
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Provider store={store}>
        <MoralisEthersProvider>
          <MoralisReactManager>
            <Lottery />
          </MoralisReactManager>
        </MoralisEthersProvider>
      </Provider>
    </MoralisProvider>
  );
}

export default App;
