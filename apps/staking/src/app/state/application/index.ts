import {
  BIG_ZERO,
  ethersToBigNumber,
  ethersToSerializedBigNumber,
  SerializedBigNumber,
} from '@dehub/shared/utils';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import DeHubStakingAbi from '../../config/abis/DeHubStaking.json';
import { getStakingAddress } from '../../utils/addressHelpers';
import { Call, multicallv2 } from '../../utils/multicall';
import getDehubPrice from '../../utils/priceDehub';
import {
  ApplicationState,
  ApplicationStatus,
  SerializedPoolInfoAndPaused,
  SerializedUserInfo,
} from './types';

const initialState: ApplicationState = {
  applicationStatus: ApplicationStatus.INITIAL,
  dehubPrice: new BigNumber(NaN).toJSON(),
  poolInfo: undefined,
  poolInfoLoading: true,
  userInfo: undefined,
  userInfoLoading: true,
  blockNumber: {},
};

export const fetchDehubPrice = createAsyncThunk<SerializedBigNumber>(
  'application/fetchDehubPrice',
  async () => {
    const dehubPrice = await getDehubPrice();
    return dehubPrice;
  }
);

export const fetchPool = createAsyncThunk<SerializedPoolInfoAndPaused>(
  'application/fetchPool',
  async () => {
    const calls: Call[] = [
      {
        name: 'getPoolInfo',
        address: getStakingAddress(),
        params: [],
      },
      {
        name: 'paused',
        address: getStakingAddress(),
        params: [],
      },
      {
        name: 'totalStaked',
        address: getStakingAddress(),
        params: [],
      },
      {
        name: 'totalStakers',
        address: getStakingAddress(),
        params: [],
      },
    ];

    const result = await multicallv2(DeHubStakingAbi, calls);
    return {
      stakingStartAt: result[0][0].stakingStartAt.toNumber(),
      tierPeriods: result[0][0].tierPeriods.map((item: EthersBigNumber) =>
        item.toNumber()
      ),
      tierPercents: result[0][0].tierPercents.map((item: EthersBigNumber) =>
        item.toNumber()
      ),
      rewardPeriod: result[0][0].rewardPeriod,
      lastRewardIndex: result[0][0].lastRewardIndex.toNumber(),
      forceUnstakeFee: result[0][0].forceUnstakeFee.toNumber(),
      totalStaked: ethersToSerializedBigNumber(result[2][0]),
      totalStakers: result[3][0].toNumber(),
      paused: result[1][0],
    } as SerializedPoolInfoAndPaused;
  }
);

export const fetchUserInfo = createAsyncThunk<
  SerializedUserInfo,
  {
    staker: string;
  }
>('application/fetchUserInfo', async ({ staker }) => {
  const calls: Call[] = [
    {
      name: 'userInfos',
      address: getStakingAddress(),
      params: [staker],
    },
    {
      name: 'userStakingShares',
      address: getStakingAddress(),
      params: [staker],
    },
    {
      name: 'totalShares',
      address: getStakingAddress(),
      params: [],
    },
    {
      name: 'pendingHarvest',
      address: getStakingAddress(),
      params: [staker],
    },
  ];

  const result = await multicallv2(DeHubStakingAbi, calls);
  const lastTierIndex = result[0].lastTierIndex.toNumber();
  const totalSharesOnTier = ethersToBigNumber(result[2][0][lastTierIndex]);
  const stakingShares = totalSharesOnTier.isEqualTo(BIG_ZERO)
    ? BIG_ZERO
    : ethersToBigNumber(result[1][0])
        .multipliedBy(new BigNumber(100))
        .dividedBy(totalSharesOnTier);

  return {
    totalAmount: ethersToSerializedBigNumber(result[0].totalAmount),
    stakingShares: stakingShares.toNumber(),
    unlockedAt: result[0].unlockAt.toNumber(),
    lastTierIndex: lastTierIndex,
    pendingHarvest: ethersToSerializedBigNumber(result[3][0]),
  } as SerializedUserInfo;
});

export const updateBlockNumber = createAction<{
  chainId: number;
  blockNumber: number;
}>('application/updateBlockNumber');

export const ApplicationSlice = createSlice({
  name: 'Application',
  initialState,
  reducers: {
    setApplicationStatus: (
      state,
      action: PayloadAction<{ appStatus: ApplicationStatus }>
    ) => {
      state.applicationStatus = action.payload.appStatus;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchDehubPrice.fulfilled,
      (state, action: PayloadAction<SerializedBigNumber>) => {
        state.dehubPrice = action.payload;
      }
    );

    builder.addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(
          blockNumber,
          state.blockNumber[chainId]
        );
      }
    });

    builder.addCase(fetchPool.pending, (state, _) => {
      state.poolInfoLoading = true;
    });

    builder.addCase(fetchPool.fulfilled, (state, action) => {
      state.poolInfo = action.payload;
      state.poolInfoLoading = false;
    });

    builder.addCase(fetchUserInfo.pending, (state, _) => {
      state.userInfoLoading = true;
    });

    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.userInfoLoading = false;
    });
  },
});

export const { setApplicationStatus } = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
