import { ChainId } from "@dehub/shared/config";

export enum WalletConnectingState {
  INIT,
  WAITING,
  COMPLETE
}

export const getChainId = () => {
  return ChainId.BSC_MAINNET;
}