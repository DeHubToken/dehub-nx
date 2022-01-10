import BigNumber from 'bignumber.js';
import { Route, Router, Switch } from 'react-router-dom';

import { ResetCSS } from '@dehub/react/pcsuikit';
import { Loader } from '@dehub/react/ui';

import SuspenseWithChunkError from './components/SuspenseWithChunkError';
import ToastListener from './components/ToastListener';
import history from './routerHistory';
import GlobalStyle from './style/Global';
import Staking from './views/Staking';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export function App() {
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError fallback={<Loader />}>
        <Switch>
          <Route path="/">
            <Staking />
          </Route>
        </Switch>
      </SuspenseWithChunkError>
      <ToastListener />
    </Router>
  );
}

export default App;
