import { JsonRpcSigner } from '@ethersproject/providers';
import { createContext } from 'react';
import { MoralisContextValue } from 'react-moralis';

export type MoralisEthersContextValue = MoralisContextValue & {
  signer: JsonRpcSigner | undefined;
  activateProvider: () => void;
  clearProvider: () => void;
};

export const MoralisEthersContext =
  createContext<null | MoralisEthersContextValue>(null);
