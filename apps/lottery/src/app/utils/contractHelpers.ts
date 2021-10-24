import { simpleRpcProvider } from './providers';
import { ethers, ContractInterface } from 'ethers';
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
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getStandardLotteryContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(getStandardLotteryAddress(), StandardLotteryAbi, signer);
};

export const getSpecialLotteryContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(getSpecialLotteryAddress(), SpecialLotteryAbi, signer);
};

export const getMultiCallContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(getMultiCallAddress(), MulticallAbi, signer);
};

export const getBep20Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(address, Bep20Abi, signer);
};
