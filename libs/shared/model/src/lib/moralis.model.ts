import { Moralis } from 'moralis';

export type ChainId =
  | 'eth'
  | '0x1'
  | 'ropsten'
  | '0x3'
  | 'rinkeby'
  | '0x4'
  | 'goerli'
  | '0x5'
  | 'kovan'
  | '0x2a'
  | 'polygon'
  | '0x89'
  | 'mumbai'
  | '0x13881'
  | 'bsc'
  | '0x38'
  | 'bsc testnet'
  | '0x61'
  | 'avalanche'
  | '0xa86a'
  | 'avalanche testnet'
  | '0xa869'
  | 'fantom'
  | '0xfa';

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
  phone?: string;
  email?: string;
}

export type User = Moralis.User<Attributes>;
export type EnableOptionsPersisted = Moralis.EnableOptions & {
  connector?: Web3ConnectorNames;
};

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

export type WalletConnectState = {
  connectorId?: DeHubConnectorNames;
  state: WalletConnectingState;
};

export enum WalletConnectingMessages {
  WAITING = 'Please confirm with your wallet.',
  SWITCH_NETWORK = 'Please confirm network switch with your wallet.',
  ADD_NETWORK = 'Please confirm network add with your wallet.',
  ConnectWallet = 'Connect Wallet',
  UnsupportedProvider = 'Provider not supported.',
  MetamaskSignatureDenied = 'Metamask signature was denied.',
  BinanceSignatureRejected = 'Binance signature was rejected.',
}

export type DeHubConnector = {
  connectorId: DeHubConnectorNames;
  email?: string;
};

// Clone of Moralis non exported 'erc20Metadata' interface.
// TODO: replace with Moralis version, when it gets properly publicly exposed.
export interface Erc20Metadata {
  /**
   * @description The address of the token contract
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  address: string;
  /**
   * @description The name of the token Contract
   * @example Kylin Network
   */
  name: string;
  /**
   * @description The symbol of the NFT contract
   * @example KYL
   */
  symbol: string;
  /**
   * @description The number of decimals on of the token
   * @example 18
   */
  decimals: string;
  /**
   * @description The logo of the token
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png
   */
  logo?: string;
  /**
   * @description The logo hash
   * @example ee7aa2cdf100649a3521a082116258e862e6971261a39b5cd4e4354fcccbc54d
   */
  logo_hash?: string;
  /**
   * @description The thumbnail of the logo
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png
   */
  thumbnail?: string;
  block_number?: string;
  validated?: string;
}
