import { BIG_ZERO, ethersToBigNumber } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { FetchStatus } from '../config/constants/types';
import { useStakingContract } from './useContract';

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
  const stakingContract = useStakingContract();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    amount: BIG_ZERO,
    reflectionDebt: BIG_ZERO,
    reflectionPending: BIG_ZERO,
    harvestDebt: BIG_ZERO,
    harvestPending: BIG_ZERO,
    harvested: false,
  });

  useEffect(() => {
    const fetch = async () => {
      const ret = await stakingContract?.userInfo(staker);
      if (ret) {
        setUserInfo(processUserInfo(ret));
      }
      setFetchStatus(ret ? FetchStatus.SUCCESS : FetchStatus.FAILED);
    };
    if (staker && stakingContract) {
      fetch();
    }
  }, [staker, stakingContract]);

  return {
    fetchStatus,
    userInfo,
  };
};
