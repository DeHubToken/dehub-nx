import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  fetchCurrentLotteryIdAndMaxBuy,
  fetchLottery,
  fetchUserTicketsPerOneRound,
  fetchDeGrandPrize
} from './helpers';
import { LotteryState, LotteryResponse, DeGrandPrize } from '../special-lottery/types';
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
    deLottoStatus: LotteryStatus.PENDING,
    deGrandStatus: LotteryStatus.PENDING,
    startTime: '',
    endTime: '',
    firstTicketId: '',
    lastTicketId: '',
    priceTicketInDehub: '',
    amountCollectedInDehub: '',
    userTickets: {
      isLoading: true,
      tickets: []
    }
  },
  deGrandPrize: {
    deGrandMonth: 0,
    title: '',
    subtitle: '',
    description: '',
    ctaUrl: '',
    imageUrl: '',
    maxWinnerCount: 0
  }
};

export const fetchCurrentLottery = createAsyncThunk<LotteryResponse, { currentLotteryId: string }>(
  'specialLottery/fetchCurrentLottery',
  async ({ currentLotteryId }) => {
    const lotteryInfo = await fetchLottery(currentLotteryId)
    return lotteryInfo
  }
)

export const fetchCurrentLotteryId = createAsyncThunk<PublicLotteryData>(
  'specialLottery/fetchCurrentLotteryId',
  async () => {
    const currentIdAndMaxBuy = await fetchCurrentLotteryIdAndMaxBuy();
    return currentIdAndMaxBuy;
  }
)

export const fetchUserTicketsAndLotteries = createAsyncThunk<{
  userTickets: LotteryTicket[]
}, { account: string, currentLotteryId: string }>(
  'specialLottery/fetchUserTicketsAndLotteries',
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
  'specialLottery/setLotteryIsTransitioning',
  async ({ isTransitioning }) => {
    return { isTransitioning };
  }
)

export const fetchThisMonthDeGrandPrize = createAsyncThunk<DeGrandPrize>(
  'specialLottery/fetchThisMonthDeGrandPrize',
  async () => {
    const deGrandPrize: DeGrandPrize | null = await fetchDeGrandPrize(Math.floor(new Date().getTime() / 1000));
    if (deGrandPrize) {
      return deGrandPrize;
    }
    return {
      deGrandMonth: 0,
      title: '',
      subtitle: '',
      description: '',
      ctaUrl: '',
      imageUrl: '',
      maxWinnerCount: 0
    };
  }
)

export const LotterySlice = createSlice({
  name: 'SpecialLottery',
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
    builder.addCase(fetchThisMonthDeGrandPrize.fulfilled, (state, action: PayloadAction<DeGrandPrize>) => {
      state.deGrandPrize = { ...state.deGrandPrize, ...action.payload };
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
});

export const { setLotteryPublicData } = LotterySlice.actions;

export default LotterySlice.reducer;