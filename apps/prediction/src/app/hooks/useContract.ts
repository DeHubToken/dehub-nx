import { useMemo } from 'react';
import {
  getBep20Contract,
  getPredictionsContract,
  getChainlinkOracleContract,
} from '../utils/contractHelpers';

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  return useMemo(() => getBep20Contract(address), [address]);
};

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */

export const usePredictionsContract = () => {
  return useMemo(() => getPredictionsContract(), []);
};

export const useChainlinkOracleContract = () => {
  return useMemo(() => getChainlinkOracleContract(), []);
};
