import { useWeb3Context } from '@dehub/react/core';
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

export const useStandardLotteryContract = (): Contract | null => {
  return useContract(getStandardLotteryAddress(), StandardLotteryAbi);
};

export const useSpecialLotteryContract = (): Contract | null => {
  return useContract(getSpecialLotteryAddress(), SpecialLotteryAbi);
};

export const useDehubContract = (): Contract | null => {
  const { web3, chainId, defaultChainId } = useWeb3Context();
  return useMemo(
    () =>
      web3 && chainId === defaultChainId
        ? getBep20Contract(getDehubAddress(), web3.getSigner())
        : null,
    [web3, chainId, defaultChainId]
  );
};

export const useBnbContract = (): Contract | null => {
  return useMemo(() => getBep20Contract(getBnbAddress()), []);
};
