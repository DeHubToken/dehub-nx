import { useRefresh, useWeb3Context } from '@dehub/react/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '..';
import { AppState } from '../index';
import { fetchPool, fetchUserInfo, setApplicationStatus } from './';
import { ApplicationStatus, PoolInfoAndPaused, UserInfo } from './types';

export const useApplicationStatus = (): ApplicationStatus => {
  return useSelector((state: AppState) => state.application.applicationStatus);
};

export const useDehubBusdPrice = (): BigNumber => {
  const dehubPriceAsString = useSelector(
    (state: AppState) => state.application.dehubPrice
  );

  const dehubPriceBusd = useMemo(() => {
    return new BigNumber(dehubPriceAsString);
  }, [dehubPriceAsString]);

  return dehubPriceBusd;
};

export const useFetchPool = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh, fastRefresh } = useRefresh();
  const { isInitialized, account } = useWeb3Context();

  const [immediatePool, setImmediatePool] = useState<number>(1);
  const [immediateUser, setImmediateUser] = useState<number>(1);

  useEffect(() => {
    const fetchInitialize = async () => {
      dispatch(fetchPool());
      dispatch(setApplicationStatus({ appStatus: ApplicationStatus.LIVE }));
    };

    if (isInitialized && immediatePool) fetchInitialize();
  }, [dispatch, isInitialized, immediatePool, slowRefresh]);

  useEffect(() => {
    if (account && immediateUser) {
      dispatch(fetchUserInfo({ staker: account }));
    }
  }, [dispatch, immediateUser, account, fastRefresh]);

  const updatePool = useCallback(() => {
    setImmediatePool(immediatePool + 1);
  }, [immediatePool]);
  const updateUser = useCallback(() => {
    setImmediateUser(immediateUser + 1);
  }, [immediateUser]);

  return {
    updatePool,
    updateUser,
  };
};

export const usePool = (): {
  poolInfo: PoolInfoAndPaused | undefined;
  poolInfoLoading: boolean;
} => {
  const poolInfo = useSelector((state: AppState) => state.application.poolInfo);
  const poolInfoLoading = useSelector(
    (state: AppState) => state.application.poolInfoLoading
  );

  return {
    poolInfo: useMemo(
      () =>
        poolInfo
          ? {
              stakingStartAt: poolInfo.stakingStartAt,
              tierPeriods: poolInfo.tierPeriods,
              tierPercents: poolInfo.tierPercents,
              rewardPeriod: poolInfo.rewardPeriod,
              lastRewardIndex: poolInfo.lastRewardIndex,
              forceUnstakeFee: poolInfo.forceUnstakeFee,
              totalStaked: new BigNumber(poolInfo.totalStaked),
              totalStakers: poolInfo.totalStakers,
              paused: poolInfo.paused,
            }
          : undefined,
      [poolInfo]
    ),
    poolInfoLoading,
  };
};

export const useUserInfo = (): {
  userInfo: UserInfo | undefined;
  userInfoLoading: boolean;
} => {
  const userInfo = useSelector((state: AppState) => state.application.userInfo);
  const userInfoLoading = useSelector(
    (state: AppState) => state.application.userInfoLoading
  );

  return {
    userInfo: useMemo(
      () =>
        userInfo
          ? {
              totalAmount: new BigNumber(userInfo.totalAmount),
              stakingShares: userInfo.stakingShares,
              unlockedAt: userInfo.unlockedAt,
              lastTierIndex: userInfo.lastTierIndex,
              pendingHarvest: new BigNumber(userInfo.pendingHarvest),
            }
          : undefined,
      [userInfo]
    ),
    userInfoLoading,
  };
};

export function useBlockNumber(): number | undefined {
  const { chainId } = useWeb3Context();

  return useSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1]
  );
}
