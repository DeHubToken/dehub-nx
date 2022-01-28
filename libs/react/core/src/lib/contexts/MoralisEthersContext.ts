// import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { createContext } from 'react';
import { MoralisContextValue } from 'react-moralis';

export type MoralisEthersContextValue = MoralisContextValue;

export const MoralisEthersContext =
  createContext<null | MoralisEthersContextValue>(null);
