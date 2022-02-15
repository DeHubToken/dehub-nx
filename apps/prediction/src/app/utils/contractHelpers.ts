import { Signer } from '@ethersproject/abstract-signer';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import chainlinkOracleAbi from '../config/abi/chainlinkOracle.json';
// ABI
import bep20Abi from '../config/abi/erc20.json';
import MulticallAbi from '../config/abi/Multicall.json';
import predictionsAbi from '../config/abi/predictions.json';
import getRpcUrl from '../utils/getRpcUrl';
// Addresses
import {
  getChainlinkOracleAddress,
  getMulticallAddress,
  getPredictionsAddress,
} from './addressHelpers';

const RPC_URL = getRpcUrl();

export const simpleRpcProvider = new JsonRpcProvider(RPC_URL);

/** TODO: use or move to shared/util/contract.utils.ts  */
export const getContract = (
  address: string,
  abi: ContractInterface,
  signer?: Signer | Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getBep20Contract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(address, bep20Abi, signer);
};

export const getPredictionsContract = (signer?: Signer | Provider) => {
  return getContract(getPredictionsAddress(), predictionsAbi, signer);
};
export const getChainlinkOracleContract = (signer?: Signer | Provider) => {
  return getContract(getChainlinkOracleAddress(), chainlinkOracleAbi, signer);
};

export const getMultiCallContract = (signer?: Signer | Provider) => {
  return getContract(getMulticallAddress(), MulticallAbi, signer);
};
