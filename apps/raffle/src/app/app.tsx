import { useEagerMoralis, withLayout } from '@dehub/react/core';
import {
  FullScreenLoader,
  NavigationTabMenu,
  SuspenseWithChunkError,
} from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { lazy, useMemo } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';
import history from './routerHistory';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const { baseUrl } = environment;
const pageTitle = 'DeHub Staking';
const { cexUrl, downloadWalletUrl } = environment.dehub;
const { landing } = environment.dehub;
const activeTab = NavigationTabMenu.Earn;

export function App() {
  useEagerMoralis();

  const Lottery = useMemo(
    () =>
      withLayout(
        {
          baseUrl,
          pageTitle,
          cexUrl,
          downloadWalletUrl,
          landing,
          activeTab,
        },
        lazy(() => import('./views/Lottery'))
      ),
    []
  );

  return (
    <Router history={history}>
      <SuspenseWithChunkError
        fallback={<FullScreenLoader baseUrl={baseUrl} pageTitle={pageTitle} />}
      >
        <Switch>
          <Route path="/">
            <Lottery baseUrl={baseUrl} />
          </Route>
        </Switch>
      </SuspenseWithChunkError>
    </Router>
  );
}

export default App;
