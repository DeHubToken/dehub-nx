import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import web3NoAccount from './web3';

// Addresses
import {
  getCakeAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
} from './addressHelpers';

// ABI
import bep20Abi from '../config/abi/erc20.json';
import cakeAbi from '../config/abi/cake.json';
import predictionsAbi from '../config/abi/predictions.json';
import chainlinkOracleAbi from '../config/abi/chainlinkOracle.json';

const getContract = (abi: AbiItem, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi as unknown as AbiItem, address);
};

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi as unknown as AbiItem, address, web3);
};

export const getCakeContract = (web3?: Web3) => {
  return getContract(cakeAbi as unknown as AbiItem, getCakeAddress(), web3);
};

export const getPredictionsContract = (web3?: Web3) => {
  return getContract(
    predictionsAbi as unknown as AbiItem,
    getPredictionsAddress(),
    web3
  );
};
export const getChainlinkOracleContract = (web3?: Web3) => {
  return getContract(
    chainlinkOracleAbi as unknown as AbiItem,
    getChainlinkOracleAddress(),
    web3
  );
};
