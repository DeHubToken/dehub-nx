import { useMemo } from 'react';
import { Hooks } from '@dehub/react/core';
import {
  getBep20Contract,
  getPredictionsContract,
  getChainlinkOracleContract,
} from '../utils/contractHelpers';

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(() => getBep20Contract(address, signer), [address, signer]);
};

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */

export const usePredictionsContract = () => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(() => getPredictionsContract(signer), [signer]);
};

export const useChainlinkOracleContract = () => {
  return useMemo(() => getChainlinkOracleContract(), []);
};
