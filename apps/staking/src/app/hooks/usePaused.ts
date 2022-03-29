import { useRefresh } from '@dehub/react/core';
import { useEffect, useState } from 'react';
import { usePickStakingContract } from './useContract';

export const useStakePaused = (contractIndex: number) => {
  const [paused, setPaused] = useState(false);
  const { slowRefresh } = useRefresh();
  const contract = usePickStakingContract(contractIndex);

  useEffect(() => {
    const fetch = async () => {
      setPaused(await contract?.paused());
    };
    if (contract) {
      fetch();
    }
  }, [contract, slowRefresh]);

  return paused;
};
