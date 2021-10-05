import { MoralisProvider } from "react-moralis";
import { Provider } from 'react-redux'
import Footer from './components/Footer';
import Header from './components/Header';
import Card from './components/Layout/Card';
import store from './state'
import DeGrand from './views/DeGrand';
import DeLotto from './views/DeLotto';

import { Constants } from '@dehub/shared/config';

const chainName = 'mainnet';

const appId = Constants[chainName].MORALIS_ID;
const serverUrl = Constants[chainName].MORALIS_SERVER;

export function App() {
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Provider store={store}>
        <div className="layout-wrapper">
          <Header />
          <div className="layout-main">
            <div className="layout-content">
              <Card
                className="mx-auto text-center"
                style={{ width: '300px', height: '100px' }}
              >
                <h1>Lottery LOGO</h1>
              </Card>
              <div className="my-8">
                <DeLotto />
              </div>
              <div className="my-8">
                <DeGrand />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Provider>
    </MoralisProvider>
  );
}

export default App;
