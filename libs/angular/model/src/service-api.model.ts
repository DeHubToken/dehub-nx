import {
  Attributes,
  CheckOrderParams,
  CheckOrderResult,
  Contacts,
  Currency,
  DeHubConnectorNames,
  DeHubShopShippingAddresses,
  Erc20Metadata,
  InitOrderParams,
  InitOrderResult,
  ShopContractPropsType,
  User,
  WalletConnectState,
} from '@dehub/shared/model';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { Observable } from 'rxjs';

export interface ILoggerService {
  info: (message: string, ...optionalParams: unknown[]) => void;
  warn: (message: string, ...optionalParams: unknown[]) => void;
  error: (message: string, error?: Error) => void;
}

/** Generic Moralis API service */
export interface IMoralisService {
  user$: Observable<User | undefined>;
  userAttributes$: Observable<Attributes | undefined>;
  account$: Observable<string | undefined>;
  isAuthenticated$: Observable<boolean>;
  username$: Observable<string>;
  walletConnectState$: Observable<WalletConnectState>;

  updateUser$: (attributes: Partial<Attributes>) => Observable<User>;

  // Authentication
  login: (
    connectorId: DeHubConnectorNames,
    chainId: number,
    magicLinkEmail: string,
    magicLinkApiKey: string
  ) => Promise<void | User>;
  logout: () => Promise<void | User>;

  // Token APIs
  getTokenAllowance$: (
    contractAddress: string,
    spender: string,
    decimals: string
  ) => Observable<BigNumber>;
  setTokenAllowance$: (
    contractAddress: string,
    spender: string,
    amount?: string
  ) => Observable<TransactionReceipt>;
  getTokenMetadata$: (label: Currency) => Observable<Erc20Metadata>;
}

/** Dehub specific moralis business logic */
export interface IDehubMoralisService {
  canPlay$: Observable<boolean>;

  /** User contact information */
  userContacts$: Observable<Contacts>;
  userShippingAddress$: Observable<DeHubShopShippingAddresses>;
  checkoutContract$: Observable<ShopContractPropsType>;

  getDeHubShopShippingAddresses$: () => Observable<
    DeHubShopShippingAddresses[]
  >;
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
  getCheckoutContract$: () => Observable<ShopContractPropsType>;
  mintReceipt$: (
    orderId: string,
    ipfsHash: string,
    checkoutContract: ShopContractPropsType,
    currency: Currency,
    price: BigNumber
  ) => Observable<TransactionReceipt>;
}
