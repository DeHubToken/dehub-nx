import { useWeb3Context } from '@dehub/react/core';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
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
  const { web3, chainId, defaultChainId } = useWeb3Context();
  return useMemo(
    () =>
      web3 && chainId === defaultChainId
        ? getBep20Contract(getDehubAddress(), web3.getSigner())
        : null,
    [web3, defaultChainId, chainId]
  );
};

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */

export const usePredictionsContract = (): Contract | null => {
  const { web3, chainId, defaultChainId } = useWeb3Context();
  return useMemo(
    () =>
      web3 && chainId === defaultChainId
        ? getPredictionsContract(web3.getSigner())
        : null,
    [web3, defaultChainId, chainId]
  );
};

export const useChainlinkOracleContract = (): Contract => {
  return useMemo(() => getChainlinkOracleContract(), []);
};
