import { createAction } from '@reduxjs/toolkit';
import { WalletConnectingState } from '@dehub/shared/config';

export const toggleWalletModal = createAction<void>('toggleWalletModal');
export const setWalletConnectingState = createAction<{
  connectingState: WalletConnectingState;
}>('walletConnectingState');
