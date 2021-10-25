import { createAction } from '@reduxjs/toolkit';
import { WalletConnectingState } from '@dehub/shared/config';

export const setWalletConnectingState = createAction<{
  connectingState: WalletConnectingState;
}>('walletConnectingState');
