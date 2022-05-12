import { SerializedBigNumber } from '@dehub/shared/utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import getDehubPrice from '../../utils/priceDehub';
import { ApplicationState, ApplicationStatus } from './types';

const initialState: ApplicationState = {
  applicationStatus: ApplicationStatus.INITIAL,
  dehubPrice: new BigNumber(NaN).toJSON(),
};

export const fetchDehubPrice = createAsyncThunk<SerializedBigNumber>(
  'application/fetchDehubPrice',
  async () => {
    const dehubPrice = await getDehubPrice();
    return dehubPrice;
  }
);

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
  },
});

export const { setApplicationStatus } = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
