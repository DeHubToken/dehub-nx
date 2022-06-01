import {
  Attributes,
  DeHubConnectorNames,
  DeHubShopShippingAddresses,
  User,
  WalletConnectState,
} from '@dehub/shared/model';
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

  login: (
    connectorId: DeHubConnectorNames,
    chainId: number,
    magicLinkEmail: string,
    magicLinkApiKey: string
  ) => Promise<void | User>;
  logout: () => Promise<void | User>;

  walletConnectState$: Observable<WalletConnectState>;
}

export interface IDehubMoralisService {
  canPlay$: Observable<boolean>;
  userShippingAddress$: Observable<DeHubShopShippingAddresses>;
  getDeHubShopShippingAddresses: () => Observable<DeHubShopShippingAddresses[]>;
}
