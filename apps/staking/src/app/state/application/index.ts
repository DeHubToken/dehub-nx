import { WalletConnectingState } from '@dehub/shared/model';
import {
  ethersToSerializedBigNumber,
  SerializedBigNumber,
} from '@dehub/shared/util';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { getStakingContract } from '../../utils/contractHelpers';
import getDehubPrice from '../../utils/priceDehub';
import { SerializedPoolInfo } from './types';

export interface ApplicationState {
  walletConnectingState: WalletConnectingState;
  dehubPrice: SerializedBigNumber;
  poolInfo?: SerializedPoolInfo;
  readonly blockNumber: { readonly [chainId: string]: number };
}

const initialState: ApplicationState = {
  walletConnectingState: WalletConnectingState.INIT,
  dehubPrice: new BigNumber(NaN).toJSON(),
  blockNumber: {},
};

export const fetchDehubPrice = createAsyncThunk<SerializedBigNumber>(
  'application/fetchDehubPrice',
  async () => {
    const dehubPrice = await getDehubPrice();

    return dehubPrice;
  }
);

export const fetchPoolInfo = createAsyncThunk<SerializedPoolInfo>(
  'application/fetchPoolInfo',
  async () => {
    const stakingContract = getStakingContract();
    const poolInfo = await stakingContract?.pool();

    return {
      openTimeStamp: Number(poolInfo?.openTimeStamp),
      closeTimeStamp: Number(poolInfo?.closeTimeStamp),
      openBlock: Number(poolInfo?.openBlock),
      closeBlock: Number(poolInfo?.closeBlock),
      emergencyPull: poolInfo?.emergencyPull,
      harvestFund: ethersToSerializedBigNumber(poolInfo?.harvestFund),
      lastUpdateBlock: ethersToSerializedBigNumber(poolInfo?.lastUpdateBlock),
      valuePerBlock: ethersToSerializedBigNumber(poolInfo?.valuePerBlock),
      totalStaked: ethersToSerializedBigNumber(poolInfo?.totalStaked),
    };
  }
);

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
  },
  extraReducers: builder => {
    builder.addCase(
      fetchDehubPrice.fulfilled,
      (state, action: PayloadAction<SerializedBigNumber>) => {
        state.dehubPrice = action.payload;
      }
    );

    builder.addCase(
      fetchPoolInfo.fulfilled,
      (state, action: PayloadAction<SerializedPoolInfo>) => {
        state.poolInfo = action.payload;
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
  },
});

export const { setWalletConnectingState } = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
