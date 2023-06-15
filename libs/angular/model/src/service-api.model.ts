import {
  AnnouncementFragment,
  Attributes,
  CheckOrderParams,
  CheckOrderResult,
  Contacts,
  Currency,
  DeHubConnectorNames,
  DeHubShopShippingAddress,
  Erc20Allowance,
  Erc20Metadata,
  Erc20TokenBalance,
  GetNativeBalanceParameters,
  GetTokenAllowanceParameters,
  GetTokenBalancesParameters,
  GetTokenMetadataParameters,
  InitOrderParams,
  InitOrderResult,
  MoralisUser,
  NativeBalance,
  ProductAvailableQuantityFragment,
  ShopContractPropsType,
  ShopOrder,
  ShopOrdersParams,
  WalletConnectState,
} from '@dehub/shared/model';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { Observable } from 'rxjs';

export interface ILoggerService {
  debug: (message: string, ...optionalParams: unknown[]) => void;
  info: (message: string, ...optionalParams: unknown[]) => void;
  warn: (message: string, ...optionalParams: unknown[]) => void;
  error: (message: string, error?: Error) => void;
}

/** Generic Moralis API service */
export interface IMoralisService {
  user$: Observable<MoralisUser | undefined>;
  userAttributes$: Observable<Attributes | undefined>;
  account$: Observable<string | undefined>;
  isAuthenticated$: Observable<boolean>;
  username$: Observable<string>;
  walletConnectState$: Observable<WalletConnectState>;

  updateUser$: (attributes: Partial<Attributes>) => Observable<MoralisUser>;

  // Authentication
  login: (
    connectorId: DeHubConnectorNames,
    chainId: number,
    magicLinkEmail: string,
    magicLinkApiKey: string
  ) => Promise<void | MoralisUser>;
  logout: () => Promise<void | MoralisUser>;

  // Token APIs
  getTokenAllowance$: (
    parameters: GetTokenAllowanceParameters
  ) => Observable<Erc20Allowance>;
  setTokenAllowance$: (
    contractAddress: string,
    spender: string,
    amount?: string
  ) => Observable<TransactionReceipt>;
  getTokenMetadata$: (
    parameters: GetTokenMetadataParameters
  ) => Observable<Erc20Metadata>;

  // Account APIs
  getNativeBalance$: (
    parameters: GetNativeBalanceParameters
  ) => Observable<NativeBalance>;
  getTokenBalances$: (
    parameters: GetTokenBalancesParameters
  ) => Observable<Erc20TokenBalance>;

  // Misc
  getCloudFunctionUrl: (functionName: string) => string;
}

/** Dehub specific moralis business logic */
export interface IDehubMoralisService {
  userContacts$: Observable<Contacts>;
  userShippingAddress$: Observable<DeHubShopShippingAddress | null>;

  getDeHubShopShippingAddresses$: () => Observable<
    DeHubShopShippingAddress[] | undefined
  >;
  getDeHubShopOrders$: (
    params: ShopOrdersParams
  ) => Observable<ShopOrder[] | undefined>;
  getWalletBalance$: (
    currency: Currency,
    address: string
  ) => Observable<BigNumber>;
  hasEnoughBalance$: (
    currency: Currency,
    address: string,
    amount: BigNumber
  ) => Observable<boolean>;
  initOrder$: (params: InitOrderParams) => Observable<InitOrderResult>;
  checkOrder$: (params: CheckOrderParams) => Observable<CheckOrderResult>;
  getCheckoutContract$: () => Observable<ShopContractPropsType | null>;
  mintReceipt$: (
    orderId: string,
    ipfsHash: string,
    checkoutContract: ShopContractPropsType,
    currency: Currency,
    price: BigNumber,
    quantity: BigNumber
  ) => Observable<TransactionReceipt>;
}

export interface IContentFulManagementService {
  /**
   * Reduce product available quantity in Contentful.
   * Apollo cache also synced for watch queries.
   *
   * @param productId Contentful Product entry id
   * @param quantity the buying quantity
   * @returns the product available quantity after decrease
   */
  reduceProductAvailableQuantity$: (
    productId: string,
    quantity: number
  ) => Observable<ProductAvailableQuantityFragment | null>;
}

export interface ICoingeckoService {
  /** Get Dehub usd price polled. */
  getDehubUsdPricePoll$: () => Observable<string>;
}

export interface IAnnouncementService {
  /** Get active announcements  */
  getAnnouncements$: () => Observable<AnnouncementFragment[]>;

  /** The number of active announcements polled */
  announcementsCountPoll$: Observable<number>;
}
