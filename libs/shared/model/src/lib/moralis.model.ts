import { Moralis } from 'moralis';
interface PluginSpecs {
  name: string;
  functions: string[];
}

/** Moralis Todo: this can be exported */
export interface StartOptions {
  serverUrl?: string;
  appId?: string;
  moralisSecret?: string;
  plugins?: PluginSpecs[];
  javascriptKey?: string;
  masterKey?: string;
}

export interface Attributes extends Moralis.Attributes {
  username: string;
  accounts: string[];
  ethAddress: string;
  /** OTT can play flag */
  can_play?: boolean;
}

export type User = Moralis.User<Attributes>;

export const enableOptionsLocalStorageKey = 'enableOptions';
export type Web3EnableOptions =
  | { provider: DeHubConnectorNames }
  | Moralis.EnableOptions;

export enum MoralisConnectorNames {
  Injected = 'metamask',
  WalletConnect = 'walletconnect',
  MagicLink = 'magicLink',
}

export enum Web3ConnectorNames {
  WalletLink = 'walletlink',
  BSC = 'binance',
}

export type DeHubConnectorNames =
  | `${MoralisConnectorNames}`
  | `${Web3ConnectorNames}`;

export enum WalletConnectingState {
  INIT,
  NO_PROVIDER,
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
