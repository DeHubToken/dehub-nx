import {
  useConnectContext,
  useEagerMoralis,
  withLayout,
} from '@dehub/react/core';
import { FullScreenLoader, SuspenseWithChunkError } from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { lazy } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './routerHistory';
import { useFetchPoolInfo, usePullBusdPrice } from './state/application/hooks';

const Staking = withLayout(lazy(() => import('./views/Staking')));

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export function App() {
  useEagerMoralis();
  useFetchPoolInfo();
  usePullBusdPrice();

  const { baseUrl, pageTitle } = useConnectContext();

  return (
    <Router history={history}>
      <SuspenseWithChunkError
        fallback={<FullScreenLoader baseUrl={baseUrl} pageTitle={pageTitle} />}
      >
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
