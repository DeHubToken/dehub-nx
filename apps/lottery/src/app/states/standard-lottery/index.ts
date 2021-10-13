import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  fetchCurrentLotteryIdAndMaxBuy,
  fetchLottery,
  fetchUserTicketsPerOneRound
} from './helpers';
import {
  LotteryState,
  LotteryResponse
} from '../types';
import { LotteryStatus, LotteryTicket } from '../../config/constants/types';

interface PublicLotteryData {
  currentLotteryId: string;
  maxNumberTicketsPerBuyOrClaim: string;
}

const initialState: LotteryState = {
  currentLotteryId: '',
  maxNumberTicketsPerBuyOrClaim: '',
  isTransitioning: false,
  currentRound: {
    isLoading: true,
    lotteryId: '',
    status: LotteryStatus.PENDING,
    startTime: '',
    endTime: '',
    firstTicketId: '',
    lastTicketId: '',
    finalNumber: 0,
    priceTicketInDehub: '',
    amountCollectedInDehub: '',
    dehubPerBracket: [],
    countWinnersPerBracket: [],
    rewardsBreakdown: [],
    userTickets: {
      isLoading: true,
      tickets: []
    }
  }
}

export const fetchCurrentLottery = createAsyncThunk<LotteryResponse, { currentLotteryId: string }>(
  'lottery/fetchCurrentLottery',
  async ({ currentLotteryId }) => {
    const lotteryInfo = await fetchLottery(currentLotteryId)
    return lotteryInfo
  }
);

export const fetchCurrentLotteryId = createAsyncThunk<PublicLotteryData>(
  'lottery/fetchCurrentLotteryId',
  async () => {
    const currentIdAndMaxBuy = await fetchCurrentLotteryIdAndMaxBuy();
    return currentIdAndMaxBuy;
  }
);

export const fetchUserTicketsAndLotteries = createAsyncThunk<{
  userTickets: LotteryTicket[]
}, { account: string, currentLotteryId: string }>(
  'lottery/fetchUserTicketsAndLotteries',
  async ({ account, currentLotteryId }) => {
    const userTickets: LotteryTicket[] = await fetchUserTicketsPerOneRound(account, currentLotteryId);
    // if (!userTickets || userTickets.length === 0) {
    //   return { userTickets: null };
    // }
    return { userTickets };
  }
)

export const setLotteryIsTransitioning = createAsyncThunk<{
  isTransitioning: boolean
}, { isTransitioning: boolean }>(
  'lottery/setLotteryIsTransitioning',
  async ({ isTransitioning }) => {
    return { isTransitioning };
  }
);

export const LotterySlice = createSlice({
  name: 'Lottery',
  initialState,
  reducers: {
    setLotteryPublicData: (state, action) => {
      state = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentLottery.fulfilled, (state, action: PayloadAction<LotteryResponse>) => {
      state.currentRound = { ...state.currentRound, ...action.payload };
    })
    builder.addCase(fetchCurrentLotteryId.fulfilled, (state, action: PayloadAction<PublicLotteryData>) => {
      state.currentLotteryId = action.payload.currentLotteryId;
      state.maxNumberTicketsPerBuyOrClaim = action.payload.maxNumberTicketsPerBuyOrClaim;
    })
    builder.addCase(
      fetchUserTicketsAndLotteries.fulfilled,
      (state, action: PayloadAction<{ userTickets: LotteryTicket[] }>) => {
        state.currentRound.userTickets = {};
        state.currentRound.userTickets.isLoading = true;
        state.currentRound.userTickets.tickets = action.payload.userTickets;
      })
    builder.addCase(setLotteryIsTransitioning.fulfilled,
      (state, action: PayloadAction<{ isTransitioning: boolean }>) => {
        state.isTransitioning = action.payload.isTransitioning;
      })
  }
});

export const { setLotteryPublicData } = LotterySlice.actions;

export default LotterySlice.reducer