import {
  Attributes,
  DeHubConnectorNames,
  User,
  WalletConnectingState,
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
    provider: DeHubConnectorNames,
    chainId: number,
    magicLinkEmail: string,
    magicLinkApiKey: string
  ) => void;
  logout: () => void;

  walletConnectingState$: Observable<WalletConnectingState>;
  setWalletConnectingState: (state: WalletConnectingState) => void;
}

export interface IDehubMoralisService {
  canPlay$: Observable<boolean>;
}
