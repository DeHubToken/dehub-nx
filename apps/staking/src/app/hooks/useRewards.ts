import { useRefresh } from '@dehub/react/core';
import { BIG_ZERO, ethersToBigNumber } from '@dehub/shared/utils';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import { FetchStatus } from '../config/constants/types';
import { usePickBNBRewardsContract } from './useContract';

export const useWeeklyRewards = (staker: string | null) => {
  const rewardsContract: Contract | null = usePickBNBRewardsContract();

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
  const { fastRefresh } = useRefresh();

  const fetchBNBRewards = useCallback(
    async (amount: BigNumber, totalStaked: BigNumber) => {
      try {
        if (!rewardsContract || !staker || !amount || !totalStaked) {
          setFetchStatus(FetchStatus.NOT_FETCHED);
          return;
        }
        const rewards = totalStaked.eq(BIG_ZERO)
          ? BIG_ZERO
          : await rewardsContract.calcCurrentClaimableShare(
              EthersBigNumber.from(amount.toString()),
              EthersBigNumber.from(totalStaked.toString())
            );
        if (rewards) setBNBRewards(ethersToBigNumber(rewards));
        const claimed = await rewardsContract.hasAlreadyClaimed(staker);
        setHasAlreadyClaimed(claimed);
        const nextCycle = await rewardsContract.nextCycleResetTimestamp();
        setNextCycleResetTimestamp(nextCycle.toNumber());

        setFetchStatus(rewards ? FetchStatus.SUCCESS : FetchStatus.FAILED);
      } catch (error) {
        console.error(error);
        setFetchStatus(FetchStatus.FAILED);
        return;
      }
    },
    [rewardsContract, staker]
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!rewardsContract) return;
        const ret = await rewardsContract.claimableDistribution();
        setTotalBNBRewards(ethersToBigNumber(ret));
        const enabled = await rewardsContract.isDistributionEnabled();
        setDistributionEnabled(enabled);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [rewardsContract, fastRefresh]);

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
