import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { getDehubPrice } from '../../utils/priceDehub';

export interface ApplicationState {
  dehubPrice: string;
}

const initialState: ApplicationState = {
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchDehubPrice.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.dehubPrice = action.payload;
      }
    );
  },
});

export default ApplicationSlice.reducer;
