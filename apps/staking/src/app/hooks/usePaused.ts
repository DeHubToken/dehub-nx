import { Hooks } from '@dehub/react/core';
import { useEffect, useState } from 'react';
import { getStakingContract } from '../utils/contractHelpers';

export const useStakePaused = () => {
  const [paused, setPaused] = useState(false);
  const { slowRefresh } = Hooks.useRefresh();

  useEffect(() => {
    const fetch = async () => {
      const stakeContract = getStakingContract();
      setPaused(await stakeContract.paused());
    };
    fetch();
  }, [slowRefresh]);

  return paused;
};
