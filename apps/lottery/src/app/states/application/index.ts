import {
  SerializedBigNumber,
  WalletConnectingState,
} from '@dehub/shared/config';
import { BIG_ZERO } from '@dehub/shared/utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import getDehubPrice from '../../utils/priceDehub';

export interface ApplicationState {
  walletConnectingState: WalletConnectingState;
  dehubPrice: SerializedBigNumber;
}

const initialState: ApplicationState = {
  walletConnectingState: WalletConnectingState.INIT,
  dehubPrice: BIG_ZERO.toJSON(),
};

export const fetchDehubPrice = createAsyncThunk<SerializedBigNumber>(
  'application/fetchDehubPrice',
  async () => {
    const dehubPrice = await getDehubPrice();
    return dehubPrice.toJSON();
  }
);

export const ApplicationSlice = createSlice({
  name: 'Application',
  initialState,
  reducers: {
    setWalletConnectingState: (state, action) => {
      state.walletConnectingState = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchDehubPrice.fulfilled,
      (state, action: PayloadAction<SerializedBigNumber>) => {
        state.dehubPrice = action.payload;
      }
    );
  },
});

export const { setWalletConnectingState } = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
