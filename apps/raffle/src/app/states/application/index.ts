import { WalletConnectingState } from '@dehub/shared/moralis';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ApplicationState {
  walletConnectingState: WalletConnectingState;
}

const initialState: ApplicationState = {
  walletConnectingState: WalletConnectingState.INIT,
};

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
});

export const { setWalletConnectingState } = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
