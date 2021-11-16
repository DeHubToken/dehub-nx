/* eslint-disable */ 
// @ts-nocheck

import React, { lazy } from 'react'
import { MoralisProvider } from 'react-moralis';
import { Contexts } from '@dehub/react/core';
import { Constants } from '@dehub/shared/config';
import { ResetCSS } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from './hooks/useEagerConnect'
import { usePollBlockNumber } from './state/hooks'
import GlobalStyle from './style/Global'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import history from './routerHistory'
import Providers from './Providers'
import { getChainId } from './config/constants';
import { RefreshContextProvider } from './contexts/RefreshContext';
import Predictions from './views/Predictions'

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const appId = Constants[getChainId()].MORALIS_ID;
const serverUrl = Constants[getChainId()].MORALIS_SERVER;

export function App() {
  usePollBlockNumber()
  useEagerConnect()

  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Providers>
        <Contexts.MoralisEthersProvider>
          <RefreshContextProvider>
            <ResetCSS />
            <GlobalStyle />
              <SuspenseWithChunkError fallback={<PageLoader />}>
                <Predictions />
              </SuspenseWithChunkError>
            <EasterEgg iterations={2} />
            <ToastListener />
          </RefreshContextProvider>
        </Contexts.MoralisEthersProvider>
      </Providers>
    </MoralisProvider>
  )
}

export default App
