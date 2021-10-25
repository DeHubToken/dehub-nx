import { createReducer } from '@reduxjs/toolkit';
import { setWalletConnectingState } from './actions';
import { WalletConnectingState } from '@dehub/shared/config';

export interface ApplicationState {
  walletConnectingState: WalletConnectingState;
}

const initialState: ApplicationState = {
  walletConnectingState: WalletConnectingState.INIT,
};

export default createReducer(initialState, builder =>
  builder.addCase(
    setWalletConnectingState,
    (state, { payload: { connectingState } }) => {
      state.walletConnectingState = connectingState;
    }
  )
);
