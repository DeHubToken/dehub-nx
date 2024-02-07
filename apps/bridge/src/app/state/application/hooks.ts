import {
  useIsBrowserTabActive,
  useRefresh,
  useWeb3Context,
} from '@dehub/react/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '..';
import { AppState } from '../index';
import { fetchPool, fetchUserInfo, setApplicationStatus } from './';
import { ApplicationStatus, PoolInfoAndPaused, UserInfo } from './types';
import { ChainType, MAX_VALUE, MIN_VALUE } from '../../constants/chains';
import { useGetDehubBalance } from '../../hooks/useTokenBalance';
import { DEHUB_DECIMALS } from '@dehub/shared/model';

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
  const isTabActive = useIsBrowserTabActive();

  const [immediatePool, setImmediatePool] = useState<number>(1);
  const [immediateUser, setImmediateUser] = useState<number>(1);

  useEffect(() => {
    const fetchInitialize = async () => {
      dispatch(fetchPool());
      dispatch(setApplicationStatus({ appStatus: ApplicationStatus.LIVE }));
    };

    if (isInitialized && immediatePool && isTabActive) fetchInitialize();
  }, [dispatch, isInitialized, immediatePool, isTabActive, slowRefresh]);

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
              minPeriod: poolInfo.minPeriod,
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
              stakedAt: userInfo.stakedAt,
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

export const useSourceChain = (): {
  chain: ChainType | null;
} => {
  const sourceChain = useSelector(
    (state: AppState) => state.application.sourceChain
  );
  return {
    chain: useMemo(() => sourceChain, [sourceChain]),
  };
};

export const useValidAmount = () => {
  const [valid, setValid] = useState<boolean>(false);
  const { amount } = useTokenAmount();
  const { userBalance, fetchStatus, bridgeBalance } = useGetDehubBalance();

  useEffect(() => {
    const _value = Number(amount);
    if (
      userBalance.div(10 ** DEHUB_DECIMALS).toNumber() >= _value &&
      bridgeBalance.div(10 ** DEHUB_DECIMALS).toNumber() >= _value &&
      MIN_VALUE <= _value &&
      MAX_VALUE >= _value
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [userBalance, bridgeBalance, amount]);

  return valid;
};

export const useTokenAmount = (): {
  amount: string;
} => {
  const tokenAmount = useSelector(
    (state: AppState) => state.application.tokenAmount
  );
  return {
    amount: useMemo(() => tokenAmount, [tokenAmount]),
  };
};

export const useUpdateState = (): {
  updateState: boolean;
} => {
  const updateState = useSelector(
    (state: AppState) => state.application.updateState
  );
  return {
    updateState: useMemo(() => updateState, [updateState]),
  };
};

export const useDstChain = (): {
  chain: ChainType | null;
} => {
  const dstChain = useSelector((state: AppState) => state.application.dstChain);
  return {
    chain: useMemo(() => dstChain, [dstChain]),
  };
};
