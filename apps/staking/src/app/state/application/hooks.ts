import { useRefresh, useWeb3Context } from '@dehub/react/core';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
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

  useEffect(() => {
    const fetchInitialize = async () => {
      dispatch(fetchPool());
      dispatch(setApplicationStatus({ appStatus: ApplicationStatus.LIVE }));
    };

    if (isInitialized) fetchInitialize();
  }, [dispatch, isInitialized, slowRefresh]);

  useEffect(() => {
    if (account) {
      dispatch(fetchUserInfo({ staker: account }));
    }
  }, [dispatch, account, fastRefresh]);
};

export const usePools = (): {
  poolInfo: PoolInfoAndPaused | undefined;
  poolInfoLoading: boolean;
} => {
  const poolInfo = useSelector((state: AppState) => state.application.poolInfo);
  const poolInfoLoading = useSelector(
    (state: AppState) => state.application.poolInfoLoading
  );

  return {
    poolInfo,
    poolInfoLoading,
  };
};

export const useStakes = (): {
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
              unlockedAt: userInfo.unlockedAt,
              harvestTotal: new BigNumber(userInfo.harvestTotal),
              harvestClaimed: new BigNumber(userInfo.harvestClaimed),
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
