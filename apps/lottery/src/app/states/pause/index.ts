import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStandardPaused, fetchSpecialPaused } from "./helpers";

export interface LotteryState {
  standardPaused: boolean;
  specialPaused: boolean;
}

const initialState: LotteryState = {
  standardPaused: false,
  specialPaused: false
}

export const fetchCurrentStandardPaused = createAsyncThunk<boolean>(
  'PauseSlice/standardPaused',
  async () => {
    const paused = await fetchStandardPaused();
    return paused;
  }
)

export const fetchCurrentSpecialPaused = createAsyncThunk<boolean>(
  'PauseSlice/specialPaused',
  async () => {
    const paused = await fetchSpecialPaused();
    return paused;
  }
)

export const PauseSlice = createSlice({
  name: 'PauseSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentStandardPaused.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.standardPaused = action.payload;
    })
    builder.addCase(fetchCurrentSpecialPaused.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.specialPaused = action.payload;
    })
  }
});

export default PauseSlice.reducer;