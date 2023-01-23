import {
  ethersToSerializedBigNumber,
  SerializedBigNumber,
} from '@dehub/shared/utils';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { DeHubStaking__factory } from '../../config/typechain/factories/contracts';
import { getStakingAddress } from '../../utils/addressHelpers';
import { getStakingContract } from '../../utils/contractHelpers';
import { Call, multicallv2 } from '../../utils/multicall';
import getDehubPrice from '../../utils/priceDehub';
import {
  ApplicationState,
  ApplicationStatus,
  PoolInfoAndPaused,
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

export const fetchPool = createAsyncThunk<PoolInfoAndPaused>(
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
    ];

    const stakingAbi = DeHubStaking__factory.abi;
    const pool = await multicallv2(stakingAbi, calls);
    return {
      ...pool[0],
      paused: pool[1],
    };
  }
);

export const fetchUserInfo = createAsyncThunk<
  SerializedUserInfo,
  {
    staker: string;
  }
>('application/fetchUserInfo', async ({ staker }) => {
  const stakingContract = getStakingContract();
  const userInfo = await stakingContract.userInfos(staker);

  return {
    totalAmount: ethersToSerializedBigNumber(userInfo.totalAmount),
    unlockedAt: Number(userInfo.unlockAt),
    harvestTotal: ethersToSerializedBigNumber(userInfo.harvestTotal),
    harvestClaimed: ethersToSerializedBigNumber(userInfo.harvestClaimed),
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
