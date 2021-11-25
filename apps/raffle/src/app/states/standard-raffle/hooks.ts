import { Hooks } from '@dehub/react/core';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchCurrentLottery,
  fetchCurrentLotteryId,
  fetchLotteryBundles,
  fetchUserData,
  fetchUserTicketsAndLotteries,
} from '.';
import { useAppDispatch } from '..';
import useRefresh from '../../hooks/useRefresh';
import { State } from '../types';
import {
  fetchLottery,
  processLotteryResponse,
  useProcessLotteryResponse,
} from './helpers';
import { LotteryBundleRule, LotteryRound, LotteryUserData } from './types';

export const useGetCurrentLotteryId = (): string => {
  return useSelector((state: State) => state.standardLottery.currentLotteryId);
};

export const useGetLotteryBundleRules = (): LotteryBundleRule[] => {
  return useSelector((state: State) => state.standardLottery.bundleRules);
};

export const useGetUserLotteryData = (): LotteryUserData => {
  return useSelector((state: State) => state.standardLottery.userLotteryData);
};

export const useGetUserLotteryDataLoading = (): boolean => {
  return useSelector(
    (state: State) => state.standardLottery.userLotteryData.isLoading
  );
};

export const useFetchLottery = () => {
  const { account } = Hooks.useMoralisEthers();
  const { fastRefresh, slowRefresh } = useRefresh();

  const dispatch = useAppDispatch();
  const { currentLotteryId, isTransitioning } = useLottery();

  useEffect(() => {
    dispatch(fetchCurrentLotteryId());
  }, [dispatch, slowRefresh]);

  useEffect(() => {
    dispatch(fetchLotteryBundles());
  }, [dispatch, slowRefresh]);

  useEffect(() => {
    if (currentLotteryId) {
      dispatch(fetchCurrentLottery({ currentLotteryId }));
    }
  }, [dispatch, currentLotteryId, fastRefresh]);

  useEffect(() => {
    if (account && currentLotteryId) {
      dispatch(fetchUserTicketsAndLotteries({ account, currentLotteryId }));
      dispatch(fetchUserData({ account, currentLotteryId }));
    }
  }, [dispatch, currentLotteryId, account, isTransitioning]);
};

export const useLottery = () => {
  const currentRound = useSelector(
    (state: State) => state.standardLottery.currentRound
  );
  const processedCurrentRound = useProcessLotteryResponse(currentRound);

  const isTransitioning = useSelector(
    (state: State) => state.standardLottery.isTransitioning
  );

  const currentLotteryId = useGetCurrentLotteryId();

  const maxNumberTicketsPerBuyOrClaimAsString = useSelector(
    (state: State) => state.standardLottery.maxNumberTicketsPerBuyOrClaim
  );
  const maxNumberTicketsPerBuyOrClaim = useMemo(() => {
    return new BigNumber(maxNumberTicketsPerBuyOrClaimAsString);
  }, [maxNumberTicketsPerBuyOrClaimAsString]);

  return {
    isTransitioning,
    currentLotteryId,
    maxNumberTicketsPerBuyOrClaim,
    currentRound: processedCurrentRound,
  };
};

export const usePreviousLottery = (lotteryId: string) => {
  const [previousRound, setPreviousRound] = useState<LotteryRound | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setPreviousRound(null);
    mountedRef.current = true;

    const fetchLotteryData = async () => {
      const lotteryData = await fetchLottery(lotteryId);
      const processedLotteryData = processLotteryResponse(lotteryData);
      if (!mountedRef.current) {
        return;
      }
      setPreviousRound(processedLotteryData);
    };

    const lotteryIdAsInt = parseInt(lotteryId, 10);
    if (lotteryIdAsInt > 0) {
      fetchLotteryData();
    }
  }, [lotteryId]);

  return {
    previousLotteryId: lotteryId,
    previousRound,
  };
};
