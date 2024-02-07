import { useWeb3Context } from '@dehub/react/core';
import { getContract } from '@dehub/shared/utils';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { getChainId } from '../config/constants';
import { getBnbAddress, getDehubBscAddress } from '../utils/addressHelpers';
import {
  getBep20Contract,
  getBridgeContract,
  getDehubTokenContract,
  getStakingContract,
} from '../utils/contractHelpers';

export function useContract(
  address?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ABI?: any,
  withSignerIfPossible = true
): Contract | null {
  const { account, web3 } = useWeb3Context();

  return useMemo(() => {
    if (!address || !ABI || !web3) return null;
    try {
      return getContract(
        address,
        ABI,
        web3,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, withSignerIfPossible, web3, account]);
}

export const useDehubContract = (): Contract | null => {
  const { web3, chainId } = useWeb3Context();

  return useMemo(
    () =>
      web3 && chainId === getChainId()
        ? getBep20Contract(getDehubBscAddress(), web3.getSigner())
        : null,
    [web3, chainId]
  );
};

export const useBnbContract = (): Contract | null => {
  return useMemo(() => getBep20Contract(getBnbAddress()), []);
};

export const usePickStakingContract = (): Contract | null => {
  const { web3, chainId } = useWeb3Context();

  return useMemo(
    () =>
      web3 && chainId === getChainId()
        ? getStakingContract(web3.getSigner())
        : null,
    [web3, chainId]
  );
};

export const useDehubTokenContract = (): Contract | null => {
  const { web3, chainId } = useWeb3Context();

  return useMemo(
    () =>
      web3 && chainId ? getDehubTokenContract(chainId, web3.getSigner()) : null,
    [web3, chainId]
  );
};

export const useBridgeContract = (): Contract | null => {
  const { web3, chainId } = useWeb3Context();

  return useMemo(
    () =>
      web3 && chainId ? getBridgeContract(chainId, web3.getSigner()) : null,
    [web3, chainId]
  );
};
