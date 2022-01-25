import { Hooks } from '@dehub/react/core';
import { BIG_ZERO, ethersToBigNumber } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { FetchStatus } from '../config/constants/types';
import { getStakingContract } from '../utils/contractHelpers';

export type UserInfo = {
  amount: BigNumber;
  reflectionDebt: BigNumber;
  reflectionPending: BigNumber;
  harvestDebt: BigNumber;
  harvestPending: BigNumber;
  harvested: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processUserInfo = (userInfo: any): UserInfo => {
  const {
    amount,
    reflectionDebt,
    reflectionPending,
    harvestDebt,
    harvestPending,
    harvested,
  } = userInfo;

  return {
    amount: ethersToBigNumber(amount),
    reflectionDebt: ethersToBigNumber(reflectionDebt),
    reflectionPending: ethersToBigNumber(reflectionPending),
    harvestDebt: ethersToBigNumber(harvestDebt),
    harvestPending: ethersToBigNumber(harvestPending),
    harvested,
  };
};

export const useStakes = (staker?: string) => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    amount: BIG_ZERO,
    reflectionDebt: BIG_ZERO,
    reflectionPending: BIG_ZERO,
    harvestDebt: BIG_ZERO,
    harvestPending: BIG_ZERO,
    harvested: false,
  });
  const { fastRefresh } = Hooks.useRefresh();

  useEffect(() => {
    const fetch = async () => {
      const stakingContract = getStakingContract();
      const ret = await stakingContract?.userInfo(staker);
      if (ret) {
        setUserInfo(processUserInfo(ret));
      }
      setFetchStatus(ret ? FetchStatus.SUCCESS : FetchStatus.FAILED);
    };
    if (staker) {
      fetch();
    }
  }, [staker, fastRefresh]);

  return {
    fetchStatus,
    userInfo,
  };
};

export const usePendingHarvest = (staker?: string) => {
  const { fastRefresh } = Hooks.useRefresh();
  const [pendingHarvest, setPendingHarvest] = useState<BigNumber | undefined>(
    undefined
  );

  useEffect(() => {
    const fetch = async () => {
      const stakingContract = getStakingContract();
      const ret = await stakingContract?.pendingHarvest(staker);
      setPendingHarvest(ethersToBigNumber(ret));
    };
    if (staker) {
      fetch();
    }
  }, [staker, fastRefresh]);

  return pendingHarvest;
};
