import { createAction } from '@reduxjs/toolkit';
import { WalletConnectingState } from '../../constants'

export const toggleWalletModal = createAction<void>('toggleWalletModal');
export const setWalletConnectingState =
  createAction<{ connectingState: WalletConnectingState }>('walletConnectingState');
