import { useWeb3Context } from '@dehub/react/core';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { getChainId } from '../config/constants';
import { getBnbAddress, getDehubBscAddress } from '../utils/addressHelpers';
import { getBep20Contract, getStakingContract } from '../utils/contractHelpers';

export function useFirstAmount(): number {
  return useMemo(() => {
    return 0.0;
  }, []);
}

export function useSecondAmount(): number {
  return useMemo(() => {
    return 0.0;
  }, []);
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
