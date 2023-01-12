import { Moralis } from 'moralis';
import { components, operations } from 'moralis/types/generated/web3Api';
import { Contacts } from './contacts.model';

export type ChainId = components['schemas']['chainList'];

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
/**
 * Clone of Moralis non exported 'getTokenMetadata.parameters' interface.
 * Moralis TODO: replace with Moralis version, when it gets properly publicly exposed.
 */
export type GetTokenMetadataParameters =
  operations['getTokenMetadata']['parameters']['query'];

/**
 * Clone of Moralis non exported 'erc20Allowance' interface.
 * Moralis TODO: replace with Moralis version, when it gets properly publicly exposed.
 */
export type Erc20Allowance = Awaited<
  ReturnType<typeof Moralis.Web3API.token.getTokenAllowance>
>;
/**
 * Clone of Moralis non exported 'getTokenAllowance.parameters' interface.
 * Moralis TODO: replace with Moralis version, when it gets properly publicly exposed.
 */
export type GetTokenAllowanceParameters =
  operations['getTokenAllowance']['parameters']['query'] &
    operations['getTokenAllowance']['parameters']['path'];

/**
 * Clone of Moralis non exported 'nativeBalance' interface.
 * Moralis TODO: replace with Moralis version, when it gets properly publicly exposed.
 */
export type NativeBalance = Awaited<
  ReturnType<typeof Moralis.Web3API.account.getNativeBalance>
>;
/**
 * Clone of Moralis non exported 'getNativeBalance.parameters' interface.
 * Moralis TODO: replace with Moralis version, when it gets properly publicly exposed.
 */
export type GetNativeBalanceParameters =
  operations['getNativeBalance']['parameters']['query'] &
    operations['getNativeBalance']['parameters']['path'];

/**
 * Clone of Moralis non exported 'erc20TokenBalance' interface.
 * Moralis TODO: replace with Moralis version, when it gets properly publicly exposed.
 */
export type Erc20TokenBalance = Awaited<
  ReturnType<typeof Moralis.Web3API.account.getTokenBalances>
>;
/**
 * Clone of Moralis non exported 'getTokenBalances.parameters' interface.
 * Moralis TODO: replace with Moralis version, when it gets properly publicly exposed.
 */
export type GetTokenBalancesParameters =
  operations['getTokenBalances']['parameters']['query'] &
    operations['getTokenBalances']['parameters']['path'];

export interface User {
  username: string;
  accounts: string[];
  ethAddress: string;
  /** OTT can play flag */
  can_play?: boolean;
}

export type Attributes = Moralis.Attributes & Contacts & User;

export type MoralisUser = Moralis.User<Attributes>;

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

export enum WalletConnectingMessage {
  WAITING = 'Please confirm with your wallet.',
  SWITCH_NETWORK = 'Please confirm network switch with your wallet.',
  ADD_NETWORK = 'Please confirm network add with your wallet.',
  ConnectWallet = 'Connect Wallet',
  UnsupportedProvider = 'Provider not supported.',
  MetamaskSignatureDenied = 'Metamask signature was denied.',
  BinanceSignatureRejected = 'Binance signature was rejected.',
}

export enum MoralisMessage {
  UpdateUser = 'Update Profile',
  UpdateUserProblem = 'There was some problem updating your profile, please get in touch.',
  ExistingEmail = 'This email is already in use by another user. If you think it’s a mistake, please get in touch.',
}

export type DeHubConnector = {
  connectorId: DeHubConnectorNames;
  email?: string;
};
