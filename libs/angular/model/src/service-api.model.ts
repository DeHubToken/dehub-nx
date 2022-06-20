import {
  Attributes,
  CheckOrderParams,
  CheckOrderResult,
  Contacts,
  CurrencyString,
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

export interface IMoralisService {
  user$: Observable<User | undefined>;
  userAttributes$: Observable<Attributes | undefined>;
  account$: Observable<string | undefined>;
  isAuthenticated$: Observable<boolean>;

  username$: Observable<string>;
  userContacts$: Observable<Contacts>;

  login: (
    connectorId: DeHubConnectorNames,
    chainId: number,
    magicLinkEmail: string,
    magicLinkApiKey: string
  ) => Promise<void | User>;
  logout: () => Promise<void | User>;

  walletConnectState$: Observable<WalletConnectState>;

  getTokenAllowance: (
    contractAddress: string,
    spender: string,
    decimals: string
  ) => Observable<BigNumber>;
  setTokenAllowance: (
    contractAddress: string,
    spender: string,
    amount?: string
  ) => Observable<TransactionReceipt>;
  getTokenMetadata(label: CurrencyString): Observable<Erc20Metadata>;
}

export interface IDehubMoralisService {
  canPlay$: Observable<boolean>;
  userShippingAddress$: Observable<DeHubShopShippingAddresses>;
  checkoutContract$: Observable<ShopContractPropsType>;
  getDeHubShopShippingAddresses: () => Observable<DeHubShopShippingAddresses[]>;
  initOrder: (params: InitOrderParams) => Observable<InitOrderResult>;
  checkOrder: (params: CheckOrderParams) => Observable<CheckOrderResult>;
  getCheckoutContract: () => Observable<ShopContractPropsType>;
  mintReceipt: (
    orderId: string,
    ipfsHash: string,
    checkoutContract: ShopContractPropsType,
    currency: CurrencyString,
    price: BigNumber
  ) => Observable<TransactionReceipt>;
}
