import { useMemo } from 'react';
import { Hooks } from '@dehub/react/core';
import { Contract } from '@ethersproject/contracts';
import {
  getBep20Contract,
  getPredictionsContract,
  getChainlinkOracleContract,
} from '../utils/contractHelpers';
import { getDehubAddress } from '../utils/addressHelpers';

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string): Contract => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(() => getBep20Contract(address, signer), [address, signer]);
};

export const useDehubContract = (): Contract => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(() => getBep20Contract(getDehubAddress(), signer), [signer]);
};

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */

export const usePredictionsContract = (): Contract => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(() => getPredictionsContract(signer), [signer]);
};

export const useChainlinkOracleContract = (): Contract => {
  return useMemo(() => getChainlinkOracleContract(), []);
};
