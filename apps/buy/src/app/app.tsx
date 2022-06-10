import { useEagerWeb3, withLayout } from '@dehub/react/core';
import {
  FullScreenLoader,
  NavigationTabMenu,
  SuspenseWithChunkError,
} from '@dehub/react/ui';
import BigNumber from 'bignumber.js';
import { lazy, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { environment } from '../environments/environment';
import useInitialize from './hooks/useInitialize';
import usePullBusdPrice from './hooks/usePullBusdPrice';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const { baseUrl } = environment;
const pageTitle = 'Buy DeHub';
const { cexUrl, downloadWalletUrl } = environment.dehub;
const { landing } = environment.dehub;
const activeTab = NavigationTabMenu.Earn;

export function App() {
  useEagerWeb3();
  usePullBusdPrice();
  useInitialize();

  const BuyDeHub = useMemo(
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
        lazy(() => import('./views/BuyDeHub'))
      ),
    []
  );

  return (
    <BrowserRouter basename={baseUrl}>
      <SuspenseWithChunkError
        fallback={<FullScreenLoader baseUrl={baseUrl} pageTitle={pageTitle} />}
      >
        <Routes>
          <Route path="/" element={<BuyDeHub />}></Route>
        </Routes>
      </SuspenseWithChunkError>
    </BrowserRouter>
  );
}

export default App;
