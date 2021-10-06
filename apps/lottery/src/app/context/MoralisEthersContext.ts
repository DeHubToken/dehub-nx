import { createContext } from 'react';
import { Web3Provider } from '@ethersproject/providers';

export interface MoralisEthersContextValue {
  authProvider: Web3Provider | null;
  activateProvider: () => void;
  isAuthenticated: boolean;
}

export const MoralisEthersContext = createContext<null | MoralisEthersContextValue>(null);