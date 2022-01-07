import { createSlice } from '@reduxjs/toolkit';

export interface LotteryState {
  standardPaused: boolean;
  specialPaused: boolean;
}

const initialState: LotteryState = {
  standardPaused: false,
  specialPaused: false,
};

export const PauseSlice = createSlice({
  name: 'PauseSlice',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default PauseSlice.reducer;
