import { createContext } from 'react';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { AuthenticateOptions } from 'react-moralis/lib/hooks/useMoralis/_useMoralisAuth';

export interface MoralisEthersContextValue {
  isAuthenticated: boolean;
  authProvider: Web3Provider | undefined;
  signer: JsonRpcSigner | undefined;
  account: string | undefined;
  chainId: string | undefined;
  authenticate: (options?: AuthenticateOptions) => Promise<void>;
  logout: () => Promise<void>;
  activateProvider: () => void;
  clearProvider: () => void;
}

export const MoralisEthersContext =
  createContext<null | MoralisEthersContextValue>(null);
