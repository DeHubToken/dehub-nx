export type ProviderTypes =
  | 'metamask'
  | 'walletconnect'
  | 'walletConnect'
  | 'wc';

export type ConnectorId = 'injected' | 'walletconnect';

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
  ADD_NETWORK = 'Please confirm network add with your wallet.',
}
