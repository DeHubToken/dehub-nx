import { usePersistState } from '@dehub/react/core';
import { useMatchBreakpoints, useModal } from '@dehub/react/pcsuikit';
import { Loader } from '@dehub/react/ui';
import React, { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useAppDispatch } from '../../state';
import { useGetPredictionsStatus, useInitialBlock } from '../../state/hooks';
import {
  fetchCurrentBets,
  initialize,
  setPredictionStatus,
} from '../../state/predictions';
import {
  getStaticPredictionsData,
  makeFutureRoundResponse,
  makeRoundData,
  transformRoundResponse,
} from '../../state/predictions/helpers';
import { fetchMarketData } from '../../state/predictions/helpers2';
import {
  HistoryFilter,
  PredictionsState,
  PredictionStatus,
} from '../../state/types';
import ChartDisclaimer from './components/ChartDisclaimer';
import CollectWinningsPopup from './components/CollectWinningsPopup';
import RiskDisclaimer from './components/RiskDisclaimer';
import SwiperProvider from './context/SwiperProvider';
import Desktop from './Desktop';
import usePollOraclePrice from './hooks/usePollOraclePrice';
import usePollRoundData from './hooks/usePollRoundData';
import Mobile from './Mobile';

const FUTURE_ROUND_COUNT = 2; // the number of rounds in the future to show

export default function Predictions({ baseUrl }: { baseUrl: string }) {
  const { isXl } = useMatchBreakpoints();
  const [, setHasAcceptedRisk] = usePersistState(
    false,
    'dehub_predictions_accepted_risk'
  );
  const [, setHasAcceptedChart] = usePersistState(
    false,
    'dehub_predictions_chart'
  );
  const { account } = useMoralis();
  const status = useGetPredictionsStatus();
  const dispatch = useAppDispatch();
  const initialBlock = useInitialBlock();
  const isDesktop = isXl;
  const handleAcceptRiskSuccess = () => setHasAcceptedRisk(true);
  const handleAcceptChart = () => setHasAcceptedChart(true);
  useModal(<RiskDisclaimer onSuccess={handleAcceptRiskSuccess} />, false);
  useModal(<ChartDisclaimer onSuccess={handleAcceptChart} />, false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [staticPredictionsData, marketData] = await Promise.all([
        getStaticPredictionsData(),
        fetchMarketData(),
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
    return <Loader />;
  }

  return (
    <SwiperProvider>
      <div
        style={{
          height: isDesktop ? 'calc(100vh - 370px)' : 'calc(100vh + 80px)',
          minHeight: isDesktop ? 'calc(100vh - 370px)' : 'calc(100vh + 80px)',
          position: 'relative',
          paddingLeft: '0',
          paddingRight: '0',
          paddingTop: !isDesktop ? '0' : '32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={`${baseUrl}/assets/img/prediction-logo.png`}
            className="anim-float-1"
            alt="Price Prediction Logo"
            style={{ maxWidth: '300px' }}
          />
        </div>

        {isDesktop ? <Desktop /> : <Mobile />}
        <CollectWinningsPopup />
      </div>
    </SwiperProvider>
  );
}
