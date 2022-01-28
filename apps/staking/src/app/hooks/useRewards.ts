import { Hooks } from '@dehub/react/core';
import { BIG_ZERO, ethersToBigNumber } from '@dehub/shared/utils';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FetchStatus } from '../config/constants/types';
import {
  getRewardsContract,
  getStakingContract,
} from '../utils/contractHelpers';

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

export const useWeeklyRewards = (staker?: string) => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [bnbRewards, setBNBRewards] = useState(BIG_ZERO);
  const [totalBNBRewards, setTotalBNBRewards] = useState<BigNumber | undefined>(
    undefined
  );
  const [isDistributionEnabled, setDistributionEnabled] =
    useState<boolean>(false);
  const [hasAlreadyClaimed, setHasAlreadyClaimed] = useState<boolean>(false);
  const [nextCycleResetTimestamp, setNextCycleResetTimestamp] =
    useState<number>(0);
  const { fastRefresh } = Hooks.useRefresh();

  const fetchBNBRewards = useCallback(
    async (amount: BigNumber) => {
      if (!staker || !amount) return;
      const rewardsContract = getRewardsContract();
      const rewards = await rewardsContract.calcCurrentClaimableShare(
        staker,
        EthersBigNumber.from(amount.toString())
      );
      if (rewards) setBNBRewards(ethersToBigNumber(rewards));
      const claimed = await rewardsContract.hasAlreadyClaimed(staker);
      setHasAlreadyClaimed(claimed);
      const nextCycle = await rewardsContract.nextCycleResetTimestamp();
      setNextCycleResetTimestamp(nextCycle.toNumber());

      setFetchStatus(rewards ? FetchStatus.SUCCESS : FetchStatus.FAILED);
    },
    [staker]
  );

  useEffect(() => {
    const fetch = async () => {
      const rewardsContract = getRewardsContract();
      const ret = await rewardsContract.claimableDistribution();
      setTotalBNBRewards(ethersToBigNumber(ret));
      const enabled = await rewardsContract.isDistributionEnabled();
      setDistributionEnabled(enabled);
    };
    fetch();
  }, [fastRefresh]);

  return {
    fetchBNBRewards,
    fetchStatus,
    bnbRewards,
    totalBNBRewards,
    isClaimable: isDistributionEnabled && !hasAlreadyClaimed,
    hasAlreadyClaimed,
    nextCycleResetTimestamp,
  };
};
