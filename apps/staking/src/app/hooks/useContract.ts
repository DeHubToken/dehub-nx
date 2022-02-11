import { getContract } from '@dehub/shared/util';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { useMoralis } from 'react-moralis';
import { getBnbAddress, getDehubAddress } from '../utils/addressHelpers';
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
  const { account, web3 } = useMoralis();

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
  const { web3 } = useMoralis();
  return useMemo(
    () => (web3 ? getBep20Contract(getDehubAddress(), web3.getSigner()) : null),
    [web3]
  );
};

export const useBnbContract = (): Contract | null => {
  return useMemo(() => getBep20Contract(getBnbAddress()), []);
};

export const useStakingContract = (): Contract | null => {
  const { web3 } = useMoralis();
  return useMemo(
    () => (web3 ? getStakingContract(web3.getSigner()) : null),
    [web3]
  );
};

export const useRewardsContract = (): Contract | null => {
  const { web3 } = useMoralis();
  return useMemo(
    () => (web3 ? getRewardsContract(web3.getSigner()) : null),
    [web3]
  );
};
