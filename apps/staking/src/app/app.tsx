import { useEagerWeb3, withLayout } from '@dehub/react/core';
import {
  FullScreenLoader,
  NavigationTabMenu,
  SuspenseWithChunkError,
} from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { lazy, useMemo } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';
import usePullBlockNumber from './hooks/usePullBlockNumber';
import usePullBusdPrice from './hooks/usePullBusdPrice';
import history from './routerHistory';
import { useApplicationStatus, useFetchPools } from './state/application/hooks';
import { ApplicationStatus } from './state/application/types';

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
  useEagerWeb3();
  useFetchPools();
  usePullBusdPrice();
  usePullBlockNumber();

  const applicationStatus = useApplicationStatus();

  const Staking = useMemo(
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
        lazy(() => import('./views/Staking'))
      ),
    []
  );

  if (applicationStatus === ApplicationStatus.INITIAL) {
    return <FullScreenLoader baseUrl={baseUrl} pageTitle={pageTitle} />;
  }

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
