import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { useMoralis } from 'react-moralis';
import { getDehubAddress } from '../utils/addressHelpers';
import {
  getBep20Contract,
  getChainlinkOracleContract,
  getPredictionsContract,
} from '../utils/contractHelpers';

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useDehubContract = (): Contract | null => {
  const { web3 } = useMoralis();
  return useMemo(
    () => (web3 ? getBep20Contract(getDehubAddress(), web3.getSigner()) : null),
    [web3]
  );
};

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */

export const usePredictionsContract = (): Contract | null => {
  const { web3 } = useMoralis();
  return useMemo(
    () => (web3 ? getPredictionsContract(web3.getSigner()) : null),
    [web3]
  );
};

export const useChainlinkOracleContract = (): Contract => {
  return useMemo(() => getChainlinkOracleContract(), []);
};
