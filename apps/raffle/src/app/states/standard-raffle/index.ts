import { BIG_ZERO } from '@dehub/shared/util';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { MAX_DELOTTO_REQUEST_SIZE } from '../../config/constants';
import { LotteryStatus, LotteryTicket } from '../../config/constants/types';
import { processLotteryUserClaimData } from '../../states/standard-raffle/helpers';
import { fetchUnclaimedUserRewards } from './fetchUnclaimedUserRewards';
import {
  fetchCurrentLotteryIdAndMaxBuy,
  fetchLottery,
  fetchLotteryBundleRules,
  fetchUserTicketsPerOneRound,
} from './helpers';
import {
  LotteryBundleRule,
  LotteryResponse,
  LotteryState,
  LotteryUserData,
  LotteryUserRound,
} from './types';

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
      tickets: [],
    },
  },
  userLotteryData: {
    isLoading: true,
    account: '',
    dehubTotal: BIG_ZERO.toJSON(),
    rounds: [],
  },
};

export const fetchCurrentLottery = createAsyncThunk<
  LotteryResponse,
  { currentLotteryId: string }
>('standardLottery/fetchCurrentLottery', async ({ currentLotteryId }) => {
  const lotteryInfo = await fetchLottery(currentLotteryId);
  return lotteryInfo;
});

export const fetchCurrentLotteryId = createAsyncThunk<PublicLotteryData>(
  'standardLottery/fetchCurrentLotteryId',
  async () => {
    const currentIdAndMaxBuy = await fetchCurrentLotteryIdAndMaxBuy();
    return currentIdAndMaxBuy;
  }
);

export const fetchLotteryBundles = createAsyncThunk<LotteryBundleRule[]>(
  'standardLottery/fetchLotteryBundleRules',
  async () => {
    const bundleRules = await fetchLotteryBundleRules();
    return bundleRules;
  }
);

export const fetchUserTicketsAndLotteries = createAsyncThunk<
  {
    userTickets: LotteryTicket[];
  },
  { account: string; currentLotteryId: string }
>(
  'standardLottery/fetchUserTicketsAndLotteries',
  async ({ account, currentLotteryId }) => {
    const userTickets: LotteryTicket[] = await fetchUserTicketsPerOneRound(
      account,
      currentLotteryId
    );
    /*
     * if (!userTickets || userTickets.length === 0) {
     *   return { userTickets: null };
     * }
     */
    return { userTickets };
  }
);

export const fetchUserData = createAsyncThunk<
  {
    userData: LotteryUserData;
  },
  { account: string; currentLotteryId: string }
>(
  'standardLottery/fetchUserData',
  async (
    { account, currentLotteryId },
    { getState }
  ): Promise<{ userData: LotteryUserData }> => {
    const { standardLottery: state } = getState() as {
      standardLottery: LotteryState;
    };
    const unclaimedRewardsResponse = await fetchUnclaimedUserRewards(
      account,
      state.userLotteryData,
      currentLotteryId,
      MAX_DELOTTO_REQUEST_SIZE
    );

    // Save newly pulled user data into redux
    const additionalUserData: LotteryUserData = processLotteryUserClaimData(
      account,
      unclaimedRewardsResponse
    );

    const { dehubTotal, rounds } = state.userLotteryData;
    if (
      state.userLotteryData.account.length > 0 &&
      state.userLotteryData.account.toLocaleLowerCase() !==
        additionalUserData.account.toLocaleLowerCase()
    ) {
      return { userData: additionalUserData };
    }

    /*
     * Accumulate unclaimed rewards
     * If additionalUserData has claimed user data, its dehubTotal must have negative value
     */
    let newDeHubTotal = new BigNumber(dehubTotal);
    const newRounds = [...rounds];
    // Replace round information
    additionalUserData.rounds.forEach((additionalRound: LotteryUserRound) => {
      const index = newRounds.findIndex(
        (round: LotteryUserRound) => round.roundId === additionalRound.roundId
      );
      if (index >= 0) {
        newDeHubTotal = newDeHubTotal
          .minus(new BigNumber(newRounds[index].dehubTotal))
          .plus(new BigNumber(additionalRound.dehubTotal));
        newRounds.splice(index, 1, additionalRound);
      } else {
        newDeHubTotal = newDeHubTotal.plus(
          new BigNumber(additionalRound.dehubTotal)
        );
        newRounds.push(additionalRound);
      }
    });

    return {
      userData: {
        account,
        dehubTotal: newDeHubTotal.toJSON(),
        rounds: newRounds,
      },
    };
  }
);

export const setLotteryIsTransitioning = createAsyncThunk<
  {
    isTransitioning: boolean;
  },
  { isTransitioning: boolean }
>('standardLottery/setLotteryIsTransitioning', async ({ isTransitioning }) => {
  return { isTransitioning };
});

export const LotterySlice = createSlice({
  name: 'StandardLottery',
  initialState,
  reducers: {
    setLotteryPublicData: (state, action) => {
      state = action.payload;
    },
    clearUserData: state => {
      state.currentRound.userTickets = {};
      state.userLotteryData = {
        isLoading: true,
        account: '',
        dehubTotal: BIG_ZERO.toJSON(),
        rounds: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchCurrentLottery.fulfilled,
      (state, action: PayloadAction<LotteryResponse>) => {
        state.currentRound = { ...state.currentRound, ...action.payload };
      }
    );
    builder.addCase(
      fetchCurrentLotteryId.fulfilled,
      (state, action: PayloadAction<PublicLotteryData>) => {
        state.currentLotteryId = action.payload.currentLotteryId;
        state.maxNumberTicketsPerBuyOrClaim =
          action.payload.maxNumberTicketsPerBuyOrClaim;
      }
    );
    builder.addCase(
      fetchLotteryBundles.fulfilled,
      (state, action: PayloadAction<LotteryBundleRule[]>) => {
        state.bundleRules = action.payload;
      }
    );
    builder.addCase(
      fetchUserTicketsAndLotteries.fulfilled,
      (state, action: PayloadAction<{ userTickets: LotteryTicket[] }>) => {
        state.currentRound.userTickets = {};
        state.currentRound.userTickets.isLoading = false;
        state.currentRound.userTickets.tickets = action.payload.userTickets;
      }
    );
    builder.addCase(fetchUserData.pending, state => {
      state.userLotteryData.isLoading = true;
    });
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: PayloadAction<{ userData: LotteryUserData }>) => {
        state.userLotteryData.isLoading = false;
        state.userLotteryData.account = action.payload.userData.account;
        state.userLotteryData.dehubTotal = action.payload.userData.dehubTotal;
        state.userLotteryData.rounds = action.payload.userData.rounds;
      }
    );
    builder.addCase(
      setLotteryIsTransitioning.fulfilled,
      (state, action: PayloadAction<{ isTransitioning: boolean }>) => {
        state.isTransitioning = action.payload.isTransitioning;
      }
    );
  },
});

export const { setLotteryPublicData, clearUserData } = LotterySlice.actions;

export default LotterySlice.reducer;
