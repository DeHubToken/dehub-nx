import { useRefresh } from '@dehub/react/core';
import { BIG_ZERO, ethersToBigNumber } from '@dehub/shared/util';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FetchStatus } from '../config/constants/types';
import { getRewardsContract } from '../utils/contractHelpers';
import { usePickStakingContract } from './useContract';

export const useProjectRewards = (
  contractIndex: number,
  staker?: string
): BigNumber | undefined => {
  const [projectRewards, setProjectRewards] = useState<
    | {
        claimableReflection: EthersBigNumber;
        claimableHarvest: EthersBigNumber;
      }
    | undefined
  >();
  const { fastRefresh } = useRefresh();
  const contract = usePickStakingContract(contractIndex);

  useEffect(() => {
    const fetch = async () => {
      const ret = await contract?.projectedRewards(staker);
      setProjectRewards(ret);
    };

    if (staker && contract) {
      fetch();
    }
  }, [contract, staker, fastRefresh]);

  return useMemo(() => {
    if (!projectRewards) return undefined;
    return ethersToBigNumber(projectRewards.claimableReflection).plus(
      ethersToBigNumber(projectRewards.claimableHarvest)
    );
  }, [projectRewards]);
};

export const useWeeklyRewards = (staker: string | null) => {
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
        if (!staker || !amount || !totalStaked) {
          setFetchStatus(FetchStatus.NOT_FETCHED);
          return;
        }
        const rewardsContract = getRewardsContract();
        const rewards = await rewardsContract.calcCurrentClaimableShare(
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
    [staker]
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const rewardsContract = getRewardsContract();
        const ret = await rewardsContract.claimableDistribution();
        setTotalBNBRewards(ethersToBigNumber(ret));
        const enabled = await rewardsContract.isDistributionEnabled();
        setDistributionEnabled(enabled);
      } catch (error) {
        console.error(error);
      }
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
