import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import maxBy from 'lodash/maxBy';
import merge from 'lodash/merge';
import { BIG_ZERO } from '@dehub/shared/utils';
import {
  Bet,
  HistoryFilter,
  Market,
  PredictionsState,
  PredictionStatus,
  Round,
} from '../types';
import {
  makeFutureRoundResponse,
  transformRoundResponse,
  getBetHistory,
  transformBetResponse,
  getBet,
  makeRoundData,
} from './helpers';

const initialState: PredictionsState = {
  status: PredictionStatus.INITIAL,
  isLoading: false,
  isHistoryPaneOpen: false,
  isChartPaneOpen: false,
  isFetchingHistory: false,
  historyFilter: HistoryFilter.ALL,
  currentEpoch: 0,
  currentRoundStartBlockNumber: 0,
  intervalBlocks: 100,
  bufferBlocks: 2,
  minBetAmount: '1000000000000000',
  lastOraclePrice: BIG_ZERO.toJSON(),
  rounds: {},
  history: {},
  bets: {},
  rewardRate: 0,
  totalRate: 100,
};

// Thunks
export const fetchBet = createAsyncThunk<
  { account: string | null | undefined; bet?: Bet },
  { account: string | null | undefined; id?: string }
>('predictions/fetchBet', async ({ account, id }) => {
  const response = await getBet(id as string);
  const bet = transformBetResponse(response);
  return { account, bet };
});

/**
 * Used to poll the user bets of the current round cards
 */
export const fetchCurrentBets = createAsyncThunk<
  { account: string | null | undefined; bets: Bet[] },
  { account: string | null | undefined; roundIds: string[] }
>('predictions/fetchCurrentBets', async ({ account, roundIds }) => {
  const betResponses = await getBetHistory({
    user: account?.toLowerCase() as string,
    round_in: roundIds,
  });

  return { account, bets: betResponses.map(transformBetResponse) };
});

export const fetchHistory = createAsyncThunk<
  { account: string | null | undefined; bets: Bet[] },
  { account: string | null | undefined; claimed?: boolean }
>('predictions/fetchHistory', async ({ account, claimed }) => {
  const response = await getBetHistory({
    user: account?.toLowerCase() as string,
    claimed: claimed as boolean,
  });
  const bets = response.map(transformBetResponse);

  return { account, bets };
});

export const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    setPredictionStatus: (state, action: PayloadAction<PredictionStatus>) => {
      state.status = action.payload;
    },
    setHistoryPaneState: (state, action: PayloadAction<boolean>) => {
      state.isHistoryPaneOpen = action.payload;
      state.historyFilter = HistoryFilter.ALL;
    },
    setChartPaneState: (state, action: PayloadAction<boolean>) => {
      state.isChartPaneOpen = action.payload;
    },
    setHistoryFilter: (state, action: PayloadAction<HistoryFilter>) => {
      state.historyFilter = action.payload;
    },
    initialize: (state, action: PayloadAction<PredictionsState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateMarketData: (
      state,
      action: PayloadAction<{ rounds: Round[]; market: Market }>
    ) => {
      const { rounds, market } = action.payload;
      const newRoundData = makeRoundData(rounds);
      const incomingCurrentRound = maxBy(rounds, 'epoch');

      if (state.currentEpoch !== incomingCurrentRound?.epoch) {
        // Add new round
        const newestRound = maxBy(rounds, 'epoch') as Round;
        const futureRound = transformRoundResponse(
          makeFutureRoundResponse(
            newestRound.epoch + 2,
            newestRound.startBlock + state.intervalBlocks
          )
        );

        newRoundData[futureRound.id] = futureRound;
      }

      state.currentEpoch = incomingCurrentRound?.epoch as number;
      state.currentRoundStartBlockNumber =
        incomingCurrentRound?.startBlock as number;
      state.status = market.paused
        ? PredictionStatus.PAUSED
        : PredictionStatus.LIVE;
      state.rounds = { ...state.rounds, ...newRoundData };
    },
    setCurrentEpoch: (state, action: PayloadAction<number>) => {
      state.currentEpoch = action.payload;
    },
    markBetAsCollected: (
      state,
      action: PayloadAction<{
        account: string | null | undefined;
        roundId: string;
      }>
    ) => {
      const { account, roundId } = action.payload;
      const accountBets = state.bets[account as string];

      if (accountBets && accountBets[roundId]) {
        accountBets[roundId].claimed = true;
      }
    },
    markPositionAsEntered: (
      state,
      action: PayloadAction<{
        account: string | null | undefined;
        roundId: string;
        bet: Bet;
      }>
    ) => {
      const { account, roundId, bet } = action.payload;

      state.bets = {
        ...state.bets,
        [account as string]: {
          ...state.bets[account as string],
          [roundId]: bet,
        },
      };
    },
    setLastOraclePrice: (state, action: PayloadAction<string>) => {
      state.lastOraclePrice = action.payload;
    },
  },
  extraReducers: builder => {
    // Get unclaimed bets
    builder.addCase(fetchCurrentBets.fulfilled, (state, action) => {
      const { account, bets } = action.payload;
      const betData = bets.reduce((accum, bet) => {
        return {
          ...accum,
          [bet.round.id]: bet,
        };
      }, {});

      state.bets = merge({}, state.bets, {
        [account as string]: betData,
      });
    });

    // Update Bet
    builder.addCase(fetchBet.fulfilled, (state, action) => {
      const { account, bet } = action.payload;
      if (account && bet)
        state.history[account] = [
          ...(state.history[account].filter(
            currentBet => currentBet.id !== bet?.id
          ) as Bet[]),
          bet,
        ];
    });

    // Show History
    builder.addCase(fetchHistory.pending, state => {
      state.isFetchingHistory = true;
    });
    builder.addCase(fetchHistory.rejected, state => {
      state.isFetchingHistory = false;
      state.isHistoryPaneOpen = true;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      const { account, bets } = action.payload;

      state.isFetchingHistory = false;
      state.isHistoryPaneOpen = true;
      state.history[account as string] = bets;

      // Save any fetched bets in the "bets" namespace
      const betData = bets.reduce((accum, bet) => {
        return {
          ...accum,
          [bet.round.id]: bet,
        };
      }, {});

      state.bets = merge({}, state.bets, {
        [account as string]: betData,
      });
    });
  },
});

// Actions
export const {
  initialize,
  setChartPaneState,
  setCurrentEpoch,
  setHistoryFilter,
  setHistoryPaneState,
  updateMarketData,
  markBetAsCollected,
  setPredictionStatus,
  markPositionAsEntered,
  setLastOraclePrice,
} = predictionsSlice.actions;

export default predictionsSlice.reducer;
