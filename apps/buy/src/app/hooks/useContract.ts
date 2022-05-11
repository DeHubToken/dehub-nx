import { useWeb3Context } from '@dehub/react/core';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { getChainId } from '../config/constants';
import { getDehubAddress } from '../utils/addresses';
import { getBep20Contract } from '../utils/contracts';

export const useDehubContract = (): Contract | null => {
  const { web3, chainId } = useWeb3Context();

  return useMemo(
    () =>
      web3 && chainId === getChainId()
        ? getBep20Contract(getDehubAddress(), web3.getSigner())
        : null,
    [web3, chainId]
  );
};
