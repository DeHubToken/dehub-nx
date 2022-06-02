import {
  WalletConnectingMessages,
  WalletConnectingState,
} from '@dehub/shared/model';

export const resolveMessage = (state: WalletConnectingState) => {
  let msg = '';
  switch (state) {
    case WalletConnectingState.SWITCH_NETWORK:
      msg = WalletConnectingMessages.SWITCH_NETWORK;
      break;
    case WalletConnectingState.ADD_NETWORK:
      msg = WalletConnectingMessages.ADD_NETWORK;
      break;
    default:
      msg = WalletConnectingMessages.WAITING;
  }
  return msg;
};
