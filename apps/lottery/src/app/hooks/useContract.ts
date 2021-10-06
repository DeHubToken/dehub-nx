import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { useMoralisEthers } from './index';

import { ContractAddresses, getContract } from '@dehub/shared/config';
import { getChainId } from '../constants';

// returns null on errors
function useContract(address?: string, ABI?: any, withSignerIfPossible = true): Contract | null {
  const {
    authProvider,
    account
  } = useMoralisEthers();

  return useMemo(() => {
    if (!address || !ABI || !authProvider) return null;
    try {
      return getContract(
        address,
        ABI,
        authProvider,
        withSignerIfPossible &&
          account ?
          account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, withSignerIfPossible, authProvider, account]);
}

export function useStandardLotteryContract(): Contract | null {
  const contractAddress = ContractAddresses[getChainId()]["StandardLottery"];
  return useContract(contractAddress);
}