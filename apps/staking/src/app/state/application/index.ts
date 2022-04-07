import { WalletConnectingState } from '@dehub/shared/model';
import { SerializedBigNumber } from '@dehub/shared/utils';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { orderBy } from 'lodash';
import { Moralis } from 'moralis';
import getDehubPrice from '../../utils/priceDehub';
import {
  ApplicationState,
  ApplicationStatus,
  ContractProperties,
  SerializedPoolInfo,
  StakingContractProperties,
} from './types';

const initialState: ApplicationState = {
  applicationStatus: ApplicationStatus.INITIAL,
  walletConnectingState: WalletConnectingState.INIT,
  dehubPrice: new BigNumber(NaN).toJSON(),
  stakingContracts: null,
  stakingController: null,
  pools: [],
  blockNumber: {},
};

export const fetchDehubPrice = createAsyncThunk<SerializedBigNumber>(
  'application/fetchDehubPrice',
  async () => {
    const dehubPrice = await getDehubPrice();
    return dehubPrice;
  }
);

export const fetchContracts = createAsyncThunk<{
  staking: StakingContractProperties[];
  controller: ContractProperties;
} | null>('application/fetchContracts', async () => {
  try {
    const result = await Moralis.Cloud.run('getStakingContracts', {});
    if (!result) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const staking = orderBy(
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
    setPools: (state, action: PayloadAction<SerializedPoolInfo[]>) => {
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
  },
});

export const { setWalletConnectingState, setApplicationStatus, setPools } =
  ApplicationSlice.actions;

export default ApplicationSlice.reducer;
