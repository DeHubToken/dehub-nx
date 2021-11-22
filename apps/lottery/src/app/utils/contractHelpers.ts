import { Signer } from '@ethersproject/abstract-signer';
import { ContractInterface, Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import { simpleRpcProvider } from './providers';
import {
  getStandardLotteryAddress,
  getSpecialLotteryAddress,
  getMultiCallAddress,
} from './addressHelpers';
import Bep20Abi from '../config/abis/erc20.json';
import StandardLotteryAbi from '../config/abis/StandardLottery.json';
import SpecialLotteryAbi from '../config/abis/SpecialLottery.json';
import MulticallAbi from '../config/abis/Multicall.json';

export const getContract = (
  address: string,
  abi: ContractInterface,
  signer?: Signer | Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getStandardLotteryContract = (signer?: Signer | Provider) => {
  return getContract(getStandardLotteryAddress(), StandardLotteryAbi, signer);
};

export const getSpecialLotteryContract = (signer?: Signer | Provider) => {
  return getContract(getSpecialLotteryAddress(), SpecialLotteryAbi, signer);
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
