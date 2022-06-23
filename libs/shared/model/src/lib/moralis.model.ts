import { Moralis } from 'moralis';
import { Contacts } from './contacts.model';

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

/** Moralis TODO: replace with Moralis version, when it gets properly publicly exposed. */
export interface StartOptions {
  serverUrl?: string;
  appId?: string;
  moralisSecret?: string;
  plugins?: PluginSpecs[];
  javascriptKey?: string;
  masterKey?: string;
}

/**
 * Clone of Moralis non exported 'erc20Metadata' interface.
 * Moralis TODO: replace with Moralis version, when it gets properly publicly exposed.
 */
export type Erc20Metadata = Awaited<
  ReturnType<typeof Moralis.Web3API.token.getTokenMetadata>
>;

export type Attributes = Moralis.Attributes &
  Contacts & {
    username: string;
    accounts: string[];
    ethAddress: string;
    /** OTT can play flag */
    can_play?: boolean;
  };

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

export enum MoralisMessages {
  UpdateUser = 'Update Profile',
  ExistingEmail = 'This email is already in use by another user. If you think it’s a mistake, please get in touch.',
}

export type DeHubConnector = {
  connectorId: DeHubConnectorNames;
  email?: string;
};
