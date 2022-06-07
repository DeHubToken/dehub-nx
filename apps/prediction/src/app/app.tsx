import { useEagerWeb3, withLayout } from '@dehub/react/core';
import { ResetCSS } from '@dehub/react/pcsuikit';
import {
  FullScreenLoader,
  NavigationTabMenu,
  SuspenseWithChunkError,
} from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { lazy, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { environment } from '../environments/environment';
import EasterEgg from './components/EasterEgg';
import ToastListener from './components/ToastListener';
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
  useEagerWeb3();
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
    <BrowserRouter>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError
        fallback={<FullScreenLoader baseUrl={baseUrl} pageTitle={pageTitle} />}
      >
        <Routes>
          <Route path="/" element={<Predictions baseUrl={baseUrl} />}></Route>
        </Routes>
      </SuspenseWithChunkError>
      <EasterEgg iterations={2} />
      <ToastListener />
    </BrowserRouter>
  );
}

export default App;
