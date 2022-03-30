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
