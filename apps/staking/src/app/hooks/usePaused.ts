import { useRefresh } from '@dehub/react/core';
import { useEffect, useState } from 'react';
import { getStakingContract } from '../utils/contractHelpers';

export const useStakePaused = (contractIndex: number) => {
  const [paused, setPaused] = useState(false);
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    const fetch = async () => {
      const stakeContract = getStakingContract(contractIndex);
      setPaused(await stakeContract.paused());
    };
    fetch();
  }, [contractIndex, slowRefresh]);

  return paused;
};
