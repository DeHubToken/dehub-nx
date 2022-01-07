import { Signer } from '@ethersproject/abstract-signer';
import { ContractInterface, Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import { simpleRpcProvider } from './providers';
import { getMultiCallAddress } from './addressHelpers';
import Bep20Abi from '../config/abis/erc20.json';
import MulticallAbi from '../config/abis/Multicall.json';

export const getContract = (
  address: string,
  abi: ContractInterface,
  signer?: Signer | Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getMultiCallContract = (signer?: Signer | Provider) => {
  return getContract(getMultiCallAddress(), MulticallAbi, signer);
};

export const getBep20Contract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(address, Bep20Abi, signer);
};
