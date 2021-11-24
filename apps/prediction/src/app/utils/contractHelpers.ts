import { Signer } from '@ethersproject/abstract-signer';
import { ContractInterface, Contract } from '@ethersproject/contracts';
import { Provider, JsonRpcProvider } from '@ethersproject/providers';
import { ChainId, Constants } from '@dehub/shared/config';

// Addresses
import {
  getCakeAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
} from './addressHelpers';

import { environment } from '../../environments/environment';
// ABI
import bep20Abi from '../config/abi/erc20.json';
import cakeAbi from '../config/abi/cake.json';
import predictionsAbi from '../config/abi/predictions.json';
import chainlinkOracleAbi from '../config/abi/chainlinkOracle.json';
import MulticallAbi from '../config/abi/Multicall.json';

export const getChainId = (): ChainId => {
  return environment.chainId;
};

export const getRpcUrl = (): string => {
  return Constants[getChainId()].RPC_URL;
};

const RPC_URL = getRpcUrl();

export const simpleRpcProvider = new JsonRpcProvider(RPC_URL);

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

export const getCakeContract = (signer?: Signer | Provider) => {
  return getContract(getCakeAddress(), cakeAbi, signer);
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
