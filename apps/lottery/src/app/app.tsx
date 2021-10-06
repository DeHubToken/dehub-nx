import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux'
import store from './state'

import { Constants } from '@dehub/shared/config';
import MoralisReactManager from './components/MoralisReactManager';
import MoralisEthersProvider from './context/MoralisEthersProvider';
import Lottery from './views/Lottery';

const chainName = 'mainnet';

const appId = Constants[chainName].MORALIS_ID;
const serverUrl = Constants[chainName].MORALIS_SERVER;

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
