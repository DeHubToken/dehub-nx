import { Hooks } from '@dehub/react/core';
import { getContract } from '@dehub/shared/utils';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import SpecialLotteryAbi from '../config/abis/SpecialLottery.json';
import StandardLotteryAbi from '../config/abis/StandardLottery.json';
import {
  getBnbAddress,
  getDehubAddress,
  getSpecialLotteryAddress,
  getStandardLotteryAddress,
} from '../utils/addressHelpers';
import { getBep20Contract } from '../utils/contractHelpers';

// returns null on errors
function useContract(
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

export const useStandardLotteryContract = (): Contract | null => {
  return useContract(getStandardLotteryAddress(), StandardLotteryAbi);
};

export const useSpecialLotteryContract = (): Contract | null => {
  return useContract(getSpecialLotteryAddress(), SpecialLotteryAbi);
};

export const useDehubContract = (): Contract | null => {
  const { signer } = Hooks.useMoralisEthers();
  return useMemo(
    () => (signer ? getBep20Contract(getDehubAddress(), signer) : null),
    [signer]
  );
};

export const useBnbContract = (): Contract | null => {
  return useMemo(() => getBep20Contract(getBnbAddress()), []);
};
