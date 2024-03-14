import { useEagerWeb3, useEnvironmentContext, withLayout } from '@dehub/react/core';
import {
  FullScreenLoader,
  SuspenseWithChunkError,
} from '@dehub/react/ui';
import { NavigationTabMenu } from '@dehub/shared/model';
import BigNumber from 'bignumber.js';
import { lazy, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { environment } from '../environments/environment';
import useInitialize from './hooks/useInitialize';
import { useApplicationStatus } from './states/application/hooks';
import { ApplicationStatus } from './states/application/types';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const {
  dehub: { landing },
} = environment;
const { cexUrl, downloadMetamaskUrl } = environment.dehub;
const activeTab = NavigationTabMenu.Clubs;

export function App() {
  const { baseUrl } = useEnvironmentContext();
  useEagerWeb3();
  useInitialize();

  const applicationStatus = useApplicationStatus();

  const BuyDeHub = useMemo(
    () =>
      withLayout(
        {
          landing,
          cexUrl,
          downloadMetamaskUrl,
          activeTab,
        },
        lazy(() => import('./views/BuyDeHub'))
      ),
    []
  );

  if (applicationStatus === ApplicationStatus.INITIAL) {
    return (
      <FullScreenLoader
        baseUrl={baseUrl}
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
            loaderGif={`${baseUrl}/assets/dehub/dehub-loader.gif`}
          />
        }
      >
        <Routes>
          <Route path="/" element={<BuyDeHub />}></Route>
        </Routes>
      </SuspenseWithChunkError>
    </BrowserRouter>
  );
}

export default App;
