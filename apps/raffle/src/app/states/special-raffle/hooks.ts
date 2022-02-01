import { Hooks } from '@dehub/react/core';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import {
  fetchCurrentLottery,
  fetchCurrentLotteryId,
  fetchThisMonthDeGrandPrize,
  fetchUserTicketsAndLotteries,
} from '.';
import { useAppDispatch } from '..';
import { State } from '../types';
import {
  fetchLottery,
  processLotteryResponse,
  useProcessLotteryResponse,
} from './helpers';
import { DeGrandPrize, LotteryRound } from './types';

export const useGetCurrentLotteryId = (): string => {
  return useSelector((state: State) => state.specialLottery.currentLotteryId);
};

export const useFetchLottery = () => {
  const { account } = useMoralis();
  const { fastRefresh, slowRefresh } = Hooks.useRefresh();

  const dispatch = useAppDispatch();
  const currentLotteryId: string = useGetCurrentLotteryId();

  useEffect(() => {
    dispatch(fetchCurrentLotteryId());
  }, [dispatch, slowRefresh]);

  useEffect(() => {
    if (currentLotteryId) {
      dispatch(fetchCurrentLottery({ currentLotteryId }));
    }
  }, [dispatch, currentLotteryId, fastRefresh]);

  useEffect(() => {
    dispatch(fetchThisMonthDeGrandPrize());
  }, [dispatch, slowRefresh]);

  useEffect(() => {
    if (account && currentLotteryId) {
      dispatch(fetchUserTicketsAndLotteries({ account, currentLotteryId }));
    }
  }, [dispatch, currentLotteryId, account]);
};

export const useLottery = () => {
  const currentRound = useSelector(
    (state: State) => state.specialLottery.currentRound
  );
  const processedCurrentRound = useProcessLotteryResponse(currentRound);

  const isTransitioning = useSelector(
    (state: State) => state.specialLottery.isTransitioning
  );

  const currentLotteryId = useGetCurrentLotteryId();

  const maxNumberTicketsPerBuyOrClaimAsString = useSelector(
    (state: State) => state.specialLottery.maxNumberTicketsPerBuyOrClaim
  );
  const maxNumberTicketsPerBuyOrClaim = useMemo(() => {
    return new BigNumber(maxNumberTicketsPerBuyOrClaimAsString);
  }, [maxNumberTicketsPerBuyOrClaimAsString]);

  const deGrandPrize = useThisMonthDeGrandPrize();

  return {
    isTransitioning,
    currentLotteryId,
    maxNumberTicketsPerBuyOrClaim,
    currentRound: processedCurrentRound,
    deGrandPrize,
  };
};

export const usePreviousLottery = (lotteryId: string) => {
  const [previousRound, setPreviousRound] = useState<LotteryRound | null>(null);

  useEffect(() => {
    setPreviousRound(null);

    const fetchLotteryData = async () => {
      const lotteryData = await fetchLottery(lotteryId);
      const processedLotteryData = processLotteryResponse(lotteryData);
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

export const useThisMonthDeGrandPrize = (): DeGrandPrize => {
  return useSelector((state: State) => state.specialLottery.deGrandPrize);
};
