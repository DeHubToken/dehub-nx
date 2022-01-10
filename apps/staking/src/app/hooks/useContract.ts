import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { ContractAddresses } from '@dehub/shared/config';
import { Hooks } from '@dehub/react/core';
import { getContract } from '@dehub/shared/utils';

import { getChainId } from '../config/constants';
import { getBep20Contract } from '../utils/contractHelpers';
import { getDehubAddress } from '../utils/addressHelpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
