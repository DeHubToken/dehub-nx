import { useEagerWeb3, withLayout } from '@dehub/react/core';
import { FullScreenLoader, SuspenseWithChunkError } from '@dehub/react/ui';
import { NavigationTabMenu } from '@dehub/shared/model';
import BigNumber from 'bignumber.js';
import { lazy, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { environment } from '../environments/environment';
import usePullBlockNumber from './hooks/usePullBlockNumber';
import usePullBusdPrice from './hooks/usePullBusdPrice';
import { useApplicationStatus, useFetchPool } from './state/application/hooks';
import { ApplicationStatus } from './state/application/types';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const {
  baseUrl,
  dehub: { landing },
} = environment;
const pageTitle = 'DeHub Staking';
const { cexUrl, downloadMetamaskUrl } = environment.dehub;
const activeTab = NavigationTabMenu.Clubs;

export function App() {
  useEagerWeb3();
  useFetchPool();
  usePullBusdPrice();
  usePullBlockNumber();

  const applicationStatus = useApplicationStatus();

  const Staking = useMemo(
    () =>
      withLayout(
        {
          baseUrl,
          landing,
          pageTitle,
          cexUrl,
          downloadMetamaskUrl,
          activeTab,
        },
        lazy(() => import('./views/Staking'))
      ),
    []
  );

  if (applicationStatus === ApplicationStatus.INITIAL) {
    return (
      <FullScreenLoader
        baseUrl={baseUrl}
        pageTitle={pageTitle}
        loaderGif={`${baseUrl}/assets/dehub/dehub-loader.gif`}
      />
    );
  }

  return (
    <BrowserRouter basename={baseUrl}>
      <SuspenseWithChunkError
        fallback={
          <FullScreenLoader
            baseUrl={baseUrl}
            pageTitle={pageTitle}
            loaderGif={`${baseUrl}/assets/dehub/dehub-loader.gif`}
          />
        }
      >
        <Routes>
          <Route path="/" element={<Staking />}></Route>
        </Routes>
      </SuspenseWithChunkError>
    </BrowserRouter>
  );
}

export default App;
