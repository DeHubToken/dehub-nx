import { createReducer } from '@reduxjs/toolkit';
import {
  toggleWalletModal,
  setWalletConnectingState
} from './actions';
import { WalletConnectingState } from '../../constants';

export interface ApplicationState {
  walletModalOpen: boolean;
  walletConnectingState: WalletConnectingState
}

const initialState: ApplicationState = {
  walletModalOpen: false,
  walletConnectingState: WalletConnectingState.INIT
}

export default createReducer(initialState, builder =>
  builder
    .addCase(toggleWalletModal, state => {
      state.walletModalOpen = !state.walletModalOpen;
    })
    .addCase(setWalletConnectingState, (state, { payload: { connectingState } }) => {
      state.walletConnectingState = connectingState;
    })
)
