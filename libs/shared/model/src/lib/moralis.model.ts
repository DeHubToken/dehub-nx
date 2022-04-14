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

/** Same type as MoralisType.Web3ProviderType */
export type MoralisWeb3ProviderType =
  | 'metamask'
  | 'walletconnect'
  | 'walletConnect'
  | 'wc'
  | 'magicLink';

export const moralisProviderLocalStorageKey = 'provider';

export type MoralisConnectorId = 'injected' | 'walletconnect';

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
