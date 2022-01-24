import { Hooks } from '@dehub/react/core';
import { ContractAddresses } from '@dehub/shared/config';
import { getContract } from '@dehub/shared/utils';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { getChainId } from '../config/constants';
import {
  getDehubAddress,
  getRewardsAddress,
  getStakingAddress,
} from '../utils/addressHelpers';
import {
  getBep20Contract,
  getRewardsContract,
  getStakingContract,
} from '../utils/contractHelpers';

export function useContract(
  address?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ABI?: any,
  withSignerIfPossible = true
): Contract | null {
  const { authProvider, account } = Hooks.useMoralisEthers();

  return useMemo(() => {
    if (!address || !ABI || !authProvider) return null;
    try {
      return getContract(
        address,
        ABI,
        authProvider,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, withSignerIfPossible, authProvider, account]);
}

export const useDehubContract = (): Contract | null => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(
    () => (signer ? getBep20Contract(getDehubAddress(), signer) : null),
    [signer]
  );
};

export const useBnbContract = (): Contract | null => {
  return useMemo(
    () => getBep20Contract(ContractAddresses[getChainId()]['BNB']),
    []
  );
};

export const useStakingContract = (): Contract | null => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(
    () => getStakingContract(getStakingAddress(), signer),
    [signer]
  );
};

export const useRewardsContract = (): Contract | null => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(
    () => (signer ? getRewardsContract(getRewardsAddress(), signer) : null),
    [signer]
  );
};
