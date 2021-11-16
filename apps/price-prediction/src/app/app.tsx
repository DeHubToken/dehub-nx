/* eslint-disable */
// @ts-nocheck

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Contexts } from '@dehub/react/core';
import { ResetCSS } from '@pancakeswap/uikit';
import BigNumber from 'bignumber.js';
import useEagerConnect from './hooks/useEagerConnect';
import { usePollBlockNumber } from './state/hooks';
import GlobalStyle from './style/Global';
import SuspenseWithChunkError from './components/SuspenseWithChunkError';
import ToastListener from './components/ToastListener';
import PageLoader from './components/PageLoader';
import EasterEgg from './components/EasterEgg';
import Predictions from './views/Predictions';
import history from './routerHistory';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export function App() {
  usePollBlockNumber();
  useEagerConnect();

  return (
    <Contexts.MoralisEthersProvider>
      <Router history={history}>
        <ResetCSS />
        <GlobalStyle />
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/">
              <Predictions />
            </Route>
          </Switch>
        </SuspenseWithChunkError>
        <EasterEgg iterations={2} />
        <ToastListener />
      </Router>
    </Contexts.MoralisEthersProvider>
  );
}

export default App;
