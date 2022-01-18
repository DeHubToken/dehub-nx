export type ProviderTypes = 'walletconnect' | 'metamask';

export enum WalletConnectingState {
  INIT,
  WAITING,
  SWITCH_NETWORK,
  ADD_NETWORK,
  COMPLETE,
}
