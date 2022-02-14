import { useEagerMoralis } from '@dehub/react/core';
import { ResetCSS } from '@dehub/react/pcsuikit';
import { Loader, SuspenseWithChunkError, withLayout } from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { lazy } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';
import EasterEgg from './components/EasterEgg';
import ToastListener from './components/ToastListener';
import history from './routerHistory';
import { usePollBlockNumber } from './state/hooks';
import GlobalStyle from './style/Global';

const Predictions = withLayout(lazy(() => import('./views/Predictions')));

const { baseUrl } = environment;

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export function App() {
  useEagerMoralis();
  usePollBlockNumber();

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError fallback={<Loader />}>
        <Switch>
          <Route path="/">
            <Predictions baseUrl={baseUrl} />
          </Route>
        </Switch>
      </SuspenseWithChunkError>
      <EasterEgg iterations={2} />
      <ToastListener />
    </Router>
  );
}

export default App;
