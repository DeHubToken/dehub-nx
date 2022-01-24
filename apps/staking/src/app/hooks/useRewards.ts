import { Hooks } from '@dehub/react/core';
import { ethersToBigNumber } from '@dehub/shared/utils';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';
import { getStakingContract } from '../utils/contractHelpers';

export const useProjectRewards = (staker?: string): BigNumber | undefined => {
  const [projectRewards, setProjectRewards] = useState<
    | {
        claimableReflection: EthersBigNumber;
        claimableHarvest: EthersBigNumber;
      }
    | undefined
  >();
  const { fastRefresh } = Hooks.useRefresh();

  useEffect(() => {
    const fetch = async () => {
      const stakingContract = getStakingContract();
      const ret = await stakingContract?.projectedRewards(staker);
      setProjectRewards(ret);
    };

    if (staker) {
      fetch();
    }
  }, [staker, fastRefresh]);

  return useMemo(() => {
    if (!projectRewards) return undefined;
    return ethersToBigNumber(projectRewards.claimableReflection).plus(
      ethersToBigNumber(projectRewards.claimableHarvest)
    );
  }, [staker, projectRewards]);
};
