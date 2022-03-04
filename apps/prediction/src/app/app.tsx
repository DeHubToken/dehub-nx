import { useEagerMoralis, withLayout } from '@dehub/react/core';
import { ResetCSS } from '@dehub/react/pcsuikit';
import {
  FullScreenLoader,
  NavigationTabMenu,
  SuspenseWithChunkError,
} from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { lazy, useMemo } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';
import EasterEgg from './components/EasterEgg';
import ToastListener from './components/ToastListener';
import history from './routerHistory';
import { usePollBlockNumber } from './state/hooks';
import GlobalStyle from './style/Global';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const { baseUrl } = environment;
const pageTitle = 'DeHub Predictions';
const { cexUrl, downloadWalletUrl } = environment.dehub;
const { landing } = environment.dehub;
const activeTab = NavigationTabMenu.Earn;

export function App() {
  useEagerMoralis();
  usePollBlockNumber();

  const Predictions = useMemo(
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
        lazy(() => import('./views/Predictions'))
      ),
    []
  );

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError
        fallback={<FullScreenLoader baseUrl={baseUrl} pageTitle={pageTitle} />}
      >
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
