import React, { useEffect, useRef, useState } from 'react';
import { Moralis } from 'moralis';
import { Helmet } from 'react-helmet-async';

import { Hooks } from '@dehub/react/core';
import { Footer, Header, Loader } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';
import { iOS } from '@dehub/shared/utils';

import { useMatchBreakpoints, useModal } from '@dehub/react/pcsuikit';
import { getChainIdHex } from '../../config/constants';
import UserMenu from '../../components/UserMenu';
import { useAppDispatch } from '../../state';
import { useWalletConnectingState } from '../../state/application/hooks';
import {
  useGetPredictionsStatus,
  useInitialBlock,
  useIsChartPaneOpen,
} from '../../state/hooks';
import {
  getMarketData,
  getStaticPredictionsData,
  makeFutureRoundResponse,
  makeRoundData,
  transformRoundResponse,
} from '../../state/predictions/helpers';
import {
  fetchCurrentBets,
  initialize,
  setPredictionStatus,
} from '../../state/predictions';
import {
  HistoryFilter,
  PredictionsState,
  PredictionStatus,
} from '../../state/types';
import usePersistState from '../../hooks/usePersistState';
import PageLoader from '../../components/PageLoader';
import PageMeta from '../../components/layout/PageMeta';
import usePollOraclePrice from './hooks/usePollOraclePrice';
import usePollRoundData from './hooks/usePollRoundData';
import Container from './components/Container';
import CollectWinningsPopup from './components/CollectWinningsPopup';
import SwiperProvider from './context/SwiperProvider';
import Desktop from './Desktop';
import Mobile from './Mobile';
import RiskDisclaimer from './components/RiskDisclaimer';
import ChartDisclaimer from './components/ChartDisclaimer';

const FUTURE_ROUND_COUNT = 2; // the number of rounds in the future to show

const initMessage = {
  header: '',
  text: '',
};

const Predictions = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState(initMessage);
  const walletConnectingState = useWalletConnectingState();

  const { isXl } = useMatchBreakpoints();
  const [hasAcceptedRisk, setHasAcceptedRisk] = usePersistState(
    false,
    'pancake_predictions_accepted_risk'
  );
  const [hasAcceptedChart, setHasAcceptedChart] = usePersistState(
    false,
    'pancake_predictions_chart'
  );
  const { clearProvider, account, signer } = Hooks.useMoralisEthers();
  const status = useGetPredictionsStatus();
  const isChartPaneOpen = useIsChartPaneOpen();
  const dispatch = useAppDispatch();
  const initialBlock = useInitialBlock();
  const isDesktop = isXl;
  const handleAcceptRiskSuccess = () => setHasAcceptedRisk(true);
  const handleAcceptChart = () => setHasAcceptedChart(true);
  const [onPresentRiskDisclaimer] = useModal(
    <RiskDisclaimer onSuccess={handleAcceptRiskSuccess} />,
    false
  );
  const [onPresentChartDisclaimer] = useModal(
    <ChartDisclaimer onSuccess={handleAcceptChart} />,
    false
  );

  // TODO: memoize modal's handlers
  const onPresentRiskDisclaimerRef = useRef(onPresentRiskDisclaimer);
  const onPresentChartDisclaimerRef = useRef(onPresentChartDisclaimer);

  /*
   * Hack to avoid trustwallet redirecting to a open in app website on iOS...
   * Ref: https://github.com/WalletConnect/walletconnect-monorepo/issues/552
   */
  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && iOS()) {
        window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
      }
    });
  }, []);

  useEffect(() => {
    Moralis.Web3.onChainChanged(newChainId => {
      if (newChainId !== getChainIdHex()) {
        clearProvider();
      }
    });
  }, [clearProvider]);

  useEffect(() => {
    if (walletConnectingState === WalletConnectingState.WAITING) {
      setShowLoader(true);
      setMessage({
        header: 'Waiting',
        text: 'Please confirm with your wallet.',
      });
    } else if (walletConnectingState === WalletConnectingState.SWITCH_NETWORK) {
      setShowLoader(true);
      setMessage({
        header: 'Waiting',
        text: 'Please confirm network switch with your wallet.',
      });
    } else if (walletConnectingState === WalletConnectingState.ADD_NETWORK) {
      setShowLoader(true);
      setMessage({
        header: 'Waiting',
        text: 'Please confirm network add with your wallet.',
      });
    } else {
      setShowLoader(false);
      setMessage(initMessage);
    }
  }, [walletConnectingState]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [staticPredictionsData, marketData] = await Promise.all([
        getStaticPredictionsData(),
        getMarketData(),
      ]);
      const { currentEpoch, intervalBlocks, bufferBlocks } =
        staticPredictionsData;
      const latestRound = marketData.rounds.find(
        round => round.epoch === currentEpoch
      );

      // Fetch data on current unclaimed bets
      dispatch(
        fetchCurrentBets({
          account,
          roundIds: marketData.rounds.map(round => round.id),
        })
      );

      if (marketData.market.paused) {
        dispatch(setPredictionStatus(PredictionStatus.PAUSED));
      } else if (latestRound && latestRound.epoch === currentEpoch) {
        const currentRoundStartBlock = Number(latestRound.startBlock);
        const futureRounds = [];
        const halfInterval = (intervalBlocks + bufferBlocks) / 2;

        for (let i = 1; i <= FUTURE_ROUND_COUNT; i++) {
          futureRounds.push(
            makeFutureRoundResponse(
              currentEpoch + i,
              (currentRoundStartBlock + halfInterval) * i
            )
          );
        }

        const roundData = makeRoundData([
          ...marketData.rounds,
          ...futureRounds.map(transformRoundResponse),
        ]);

        dispatch(
          initialize({
            ...(staticPredictionsData as Omit<PredictionsState, 'rounds'>),
            historyFilter: HistoryFilter.ALL,
            currentRoundStartBlockNumber: currentRoundStartBlock,
            rounds: roundData,
            history: {},
            bets: {},
          })
        );
      } else {
        // If the latest epoch from the API does not match the latest epoch from the contract we have an unrecoverable error
        dispatch(setPredictionStatus(PredictionStatus.ERROR));
      }
    };

    // Do not start initialization until the first block has been retrieved
    if (initialBlock > 0) {
      fetchInitialData();
    }
  }, [initialBlock, dispatch, account]);

  usePollRoundData();
  usePollOraclePrice();

  if (status === PredictionStatus.INITIAL) {
    return <PageLoader />;
  }

  return (
    <div>
      <PageMeta />
      {showLoader ? (
        <Loader header={message.header} text={message.text} />
      ) : (
        <>
          <Helmet>
            <script
              src="https://s3.tradingview.com/tv.js"
              type="text/javascript"
              id="tradingViewWidget"
            />
          </Helmet>
          <SwiperProvider>
            <div
              className="layout-wrapper"
              style={{
                background:
                  'linear-gradient(45deg, rgba(11, 17, 19, 0.95), rgba(5, 17, 24, 0.9) 46%, rgba(6, 12, 29, 0.8) 71%, rgba(50, 19, 56, 0.95)), url("assets/img/prize-draw-bg.jpg") no-repeat fixed center center /cover',
              }}
            >
              <Header
                userMenu={<UserMenu />}
                logo={{
                  href: 'https://dehub.net',
                  icon: 'assets/dehub/logo-dehub-white.svg',
                }}
              />
              <div className="layout-main">
                <div
                  className="layout-content"
                  style={{
                    height: 'calc(100vh)',
                    minHeight: 'calc(100vh)',
                    overflow: 'hidden',
                    position: 'relative',
                    paddingLeft: '0',
                    paddingRight: '0',
                  }}
                >
                  <div className="flex flex-column align-items-center justify-content-between mb-8">
                    <img
                      src="../../assets/img/prediction-logo.png"
                      className="anim-float-1"
                      alt="Price Prediction Logo"
                      style={{ maxWidth: '300px' }}
                    />
                  </div>
                  {isDesktop ? <Desktop /> : <Mobile />}
                  <CollectWinningsPopup />
                </div>
              </div>
              <Footer />
            </div>
          </SwiperProvider>
        </>
      )}
    </div>
  );
};

export default Predictions;
