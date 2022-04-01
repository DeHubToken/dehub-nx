import { WalletConnectingState } from '@dehub/shared/model';
import {
  BIG_ZERO,
  ethersToSerializedBigNumber,
  SerializedBigNumber,
} from '@dehub/shared/util';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { orderBy } from 'lodash';
import { Moralis } from 'moralis';
import { Call, multicallv2 } from '../../utils/multicall';
import getDehubPrice from '../../utils/priceDehub';
import {
  ApplicationState,
  ApplicationStatus,
  ContractProperties,
  SerializedPoolInfoPaused,
  SerializedUserInfo,
  StakingContractProperties,
} from './types';

const initialState: ApplicationState = {
  applicationStatus: ApplicationStatus.INITIAL,
  walletConnectingState: WalletConnectingState.INIT,
  dehubPrice: new BigNumber(NaN).toJSON(),
  stakingContracts: null,
  stakingController: null,
  pools: [],
  poolsLoading: true,
  userInfos: [],
  userInfosLoading: true,
  pendingHarvestLoading: true,
  blockNumber: {},
};

export const fetchDehubPrice = createAsyncThunk<SerializedBigNumber>(
  'application/fetchDehubPrice',
  async () => {
    const dehubPrice = await getDehubPrice();
    return dehubPrice;
  }
);

export const fetchUserInfos = createAsyncThunk<
  SerializedUserInfo[],
  {
    contracts: StakingContractProperties[];
    staker: string;
  }
>('application/fetchUserInfos', async ({ contracts, staker }) => {
  const calls: Call[] = contracts.map(contract => ({
    name: 'userInfo',
    address: contract.address,
    params: [staker],
  }));

  const abi = contracts[0].abi;
  const userInfos = await multicallv2(abi, calls);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return userInfos.map((userInfo: any) => ({
    amount: ethersToSerializedBigNumber(userInfo.amount),
    reflectionDebt: ethersToSerializedBigNumber(userInfo.reflectionDebt),
    reflectionPending: ethersToSerializedBigNumber(userInfo.reflectionPending),
    harvestDebt: ethersToSerializedBigNumber(userInfo.harvestDebt),
    harvestPending: ethersToSerializedBigNumber(userInfo.harvestPending),
    harvested: userInfo.harvested,
  }));
});

export const fetchPendingHarvest = createAsyncThunk<
  SerializedBigNumber[],
  {
    contracts: StakingContractProperties[];
    staker: string;
  }
>('application/fetchPendingHarvest', async ({ contracts, staker }) => {
  const calls: Call[] = contracts.map(contract => ({
    name: 'pendingHarvest',
    address: contract.address,
    params: [staker],
  }));

  const abi = contracts[0].abi;
  const pendingHarvests = await multicallv2(abi, calls);

  return pendingHarvests.map((pendings: EthersBigNumber[]) =>
    ethersToSerializedBigNumber(pendings[0].add(pendings[1]))
  );
});

export const fetchContracts = createAsyncThunk<{
  staking: StakingContractProperties[];
  controller: ContractProperties;
} | null>('application/fetchContracts', async () => {
  try {
    const result = await Moralis.Cloud.run('getStakingContracts', {});
    if (!result) return null;
    const staking = orderBy(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.map((item: any) => ({
        year: item.year,
        month: item.month,
        address: item.address,
        name: item.name,
        chainId: item.chainId,
        abi: item.abi,
      })),
      ['chainId', 'year', 'month', 'name'],
      'desc'
    );
    const controller = await Moralis.Cloud.run(
      'getStakingControllerContract',
      {}
    );
    if (!controller) return null;
    return {
      staking: staking,
      controller: {
        address: controller.address,
        name: controller.name,
        chainId: controller.chainId,
        abi: controller.abi,
      },
    };
  } catch (error) {
    console.error(error);
  }
  return null;
});

export const updateBlockNumber = createAction<{
  chainId: string;
  blockNumber: number;
}>('application/updateBlockNumber');

export const ApplicationSlice = createSlice({
  name: 'Application',
  initialState,
  reducers: {
    setWalletConnectingState: (
      state,
      action: PayloadAction<{ connectingState: WalletConnectingState }>
    ) => {
      state.walletConnectingState = action.payload.connectingState;
    },
    setApplicationStatus: (
      state,
      action: PayloadAction<{ appStatus: ApplicationStatus }>
    ) => {
      state.applicationStatus = action.payload.appStatus;
    },
    setPoolsLoading: (state, action: PayloadAction<boolean>) => {
      state.poolsLoading = action.payload;
    },
    setPools: (state, action: PayloadAction<SerializedPoolInfoPaused[]>) => {
      state.pools = action.payload;
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

    builder.addCase(fetchContracts.fulfilled, (state, action) => {
      if (action.payload) {
        state.stakingContracts = action.payload.staking;
        state.stakingController = action.payload.controller;
      }
    });

    // builder.addCase(fetchUserInfos.pending, (state, _) => {
    //   state.userInfosLoading = true;
    // });

    builder.addCase(fetchUserInfos.fulfilled, (state, action) => {
      state.userInfos = action.payload.map(
        (userInfo: SerializedUserInfo, index: number) => ({
          ...userInfo,
          pendingHarvest:
            state.userInfos.length > index
              ? state.userInfos[index].pendingHarvest
              : BIG_ZERO.toString(),
        })
      );
      state.userInfosLoading = false;
    });

    // builder.addCase(fetchPendingHarvest.pending, (state, _) => {
    //   state.pendingHarvestLoading = true;
    // });

    builder.addCase(fetchPendingHarvest.fulfilled, (state, action) => {
      const init: SerializedUserInfo = {
        amount: BIG_ZERO.toString(),
        reflectionDebt: BIG_ZERO.toString(),
        reflectionPending: BIG_ZERO.toString(),
        harvestDebt: BIG_ZERO.toString(),
        harvestPending: BIG_ZERO.toString(),
        harvested: false,
      };
      state.userInfos = action.payload.map(
        (pendingHarvest: SerializedBigNumber, index: number) =>
          state.userInfos.length > index
            ? {
                ...state.userInfos[index],
                pendingHarvest,
              }
            : {
                ...init,
                pendingHarvest,
              }
      );
      state.pendingHarvestLoading = false;
    });
  },
});

export const { setWalletConnectingState, setApplicationStatus, setPools } =
  ApplicationSlice.actions;

export default ApplicationSlice.reducer;
