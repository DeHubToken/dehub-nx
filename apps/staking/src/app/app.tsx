import { Hooks } from '@dehub/react/core';
import { Loader } from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { Route, Router, Switch } from 'react-router-dom';
import SuspenseWithChunkError from './components/SuspenseWithChunkError';
import history from './routerHistory';
import Staking from './views/Staking';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export function App() {
  Hooks.useEagerMoralis();

  return (
    <Router history={history}>
      <SuspenseWithChunkError fallback={<Loader />}>
        <Switch>
          <Route path="/">
            <Staking />
          </Route>
        </Switch>
      </SuspenseWithChunkError>
    </Router>
  );
}

export default App;
