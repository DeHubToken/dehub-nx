import { useEagerMoralis } from '@dehub/react/core';
import { Loader, SuspenseWithChunkError, withLayout } from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { lazy } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';
import history from './routerHistory';

const Lottery = withLayout(lazy(() => import('./views/Lottery')));

const { baseUrl } = environment;

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export function App() {
  useEagerMoralis();

  return (
    <Router history={history}>
      <SuspenseWithChunkError fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <Lottery baseUrl={baseUrl} />
          </Route>
        </Switch>
      </SuspenseWithChunkError>
    </Router>
  );
}

export default App;
