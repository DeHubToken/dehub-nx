import {
  WalletConnectingMessage,
  WalletConnectingState,
} from '@dehub/shared/model';

export const resolveMessage = (state: WalletConnectingState) => {
  let msg = '';
  switch (state) {
    case WalletConnectingState.SWITCH_NETWORK:
      msg = WalletConnectingMessage.SWITCH_NETWORK;
      break;
    case WalletConnectingState.ADD_NETWORK:
      msg = WalletConnectingMessage.ADD_NETWORK;
      break;
    default:
      msg = WalletConnectingMessage.WAITING;
  }
  return msg;
};
