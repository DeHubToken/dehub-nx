import { WalletConnectingState } from '@dehub/shared/model';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { getDehubPrice } from '../../utils/priceDehub';

export interface ApplicationState {
  walletConnectingState: WalletConnectingState;
  dehubPrice: string;
}

const initialState: ApplicationState = {
  walletConnectingState: WalletConnectingState.INIT,
  dehubPrice: new BigNumber(NaN).toJSON(),
};

export const fetchDehubPrice = createAsyncThunk<string>(
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
      (state, action: PayloadAction<string>) => {
        state.dehubPrice = action.payload;
      }
    );
  },
});

export const { setWalletConnectingState } = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
