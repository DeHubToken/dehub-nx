export type ProviderTypes = 'walletconnect' | 'metamask';

export enum WalletConnectingState {
  INIT,
  WAITING,
  SWITCH_NETWORK,
  ADD_NETWORK,
  COMPLETE,
}

export enum WalletConnectingMessages {
  WAITING = 'Please confirm with your wallet.',
  SWITCH_NETWORK = 'Please confirm network switch with your wallet.',
  ADD_NETWORK = 'Please confirm network switch with your wallet.',
}
