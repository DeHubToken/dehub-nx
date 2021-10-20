import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  fetchCurrentLotteryIdAndMaxBuy,
  fetchLottery,
  fetchLotteryBundleRules,
  fetchUserTicketsPerOneRound
} from './helpers';
import {
  LotteryState,
  LotteryResponse,
  LotteryBundleRule
} from './types';
import { LotteryStatus, LotteryTicket } from '../../config/constants/types';

interface PublicLotteryData {
  currentLotteryId: string;
  maxNumberTicketsPerBuyOrClaim: string;
}

const initialState: LotteryState = {
  currentLotteryId: '',
  maxNumberTicketsPerBuyOrClaim: '',
  isTransitioning: false,
  bundleRules: [],
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
    unwonPreviousPotInDehub: '',
    amountCollectedInDehub: '',
    dehubPerBracket: [],
    countWinnersPerBracket: [],
    rewardsBreakdown: [],
    userTickets: {
      isLoading: true,
      tickets: []
    }
  }
};

export const fetchCurrentLottery = createAsyncThunk<LotteryResponse, { currentLotteryId: string }>(
  'standardLottery/fetchCurrentLottery',
  async ({ currentLotteryId }) => {
    const lotteryInfo = await fetchLottery(currentLotteryId)
    return lotteryInfo
  }
)

export const fetchCurrentLotteryId = createAsyncThunk<PublicLotteryData>(
  'standardLottery/fetchCurrentLotteryId',
  async () => {
    const currentIdAndMaxBuy = await fetchCurrentLotteryIdAndMaxBuy();
    return currentIdAndMaxBuy;
  }
)

export const fetchLotteryBundles = createAsyncThunk<LotteryBundleRule[]>(
  'standardLottery/fetchLotteryBundleRules',
  async () => {
    const bundleRules = await fetchLotteryBundleRules();
    return bundleRules;
  }
)

export const fetchUserTicketsAndLotteries = createAsyncThunk<{
  userTickets: LotteryTicket[]
}, { account: string, currentLotteryId: string }>(
  'standardLottery/fetchUserTicketsAndLotteries',
  async ({ account, currentLotteryId }) => {
    const userTickets: LotteryTicket[] = await fetchUserTicketsPerOneRound(account, currentLotteryId);
    /*
     * if (!userTickets || userTickets.length === 0) {
     *   return { userTickets: null };
     * }
     */
    return { userTickets };
  }
)

export const setLotteryIsTransitioning = createAsyncThunk<{
  isTransitioning: boolean
}, { isTransitioning: boolean }>(
  'standardLottery/setLotteryIsTransitioning',
  async ({ isTransitioning }) => {
    return { isTransitioning };
  }
)

export const LotterySlice = createSlice({
  name: 'StandardLottery',
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
    builder.addCase(fetchLotteryBundles.fulfilled, (state, action: PayloadAction<LotteryBundleRule[]>) => {
      state.bundleRules = action.payload;
    })
    builder.addCase(
      fetchUserTicketsAndLotteries.fulfilled,
      (state, action: PayloadAction<{ userTickets: LotteryTicket[] }>) => {
        state.currentRound.userTickets = {};
        state.currentRound.userTickets.isLoading = false;
        state.currentRound.userTickets.tickets = action.payload.userTickets;
      })
    builder.addCase(setLotteryIsTransitioning.fulfilled,
      (state, action: PayloadAction<{ isTransitioning: boolean }>) => {
        state.isTransitioning = action.payload.isTransitioning;
      })
  }
})

export const { setLotteryPublicData } = LotterySlice.actions;

export default LotterySlice.reducer;