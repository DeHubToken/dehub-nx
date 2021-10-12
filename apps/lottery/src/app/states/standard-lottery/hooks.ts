import { useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useSelector } from 'react-redux';
import { Hooks } from '@dehub/react/core';

import {
  fetchCurrentLottery,
  fetchCurrentLotteryId,
  fetchUserTicketsAndLotteries
} from '.';
import {
  fetchLottery,
  useProcessStandardLotteryResponse,
  processStandardLotteryResponse
} from './helpers';
import { useAppDispatch } from '..';
import { LotteryRound, State } from '../types';

export const useGetCurrentStandardLotteryId = (): string => {
  return useSelector((state: State) => state.lottery.currentLotteryId);
}

export const useFetchLottery = () => {
  const { account } = Hooks.useMoralisEthers();

  const dispatch = useAppDispatch();
  const currentLotteryId: string = useGetCurrentStandardLotteryId();

  useEffect(() => {
    dispatch(fetchCurrentLotteryId());

  }, [dispatch]);

  useEffect(() => {
    if (currentLotteryId) {
      dispatch(fetchCurrentLottery({ currentLotteryId }));
    }

  }, [dispatch, currentLotteryId]);

  useEffect(() => {
    if (account && currentLotteryId) {
      dispatch(fetchUserTicketsAndLotteries({ account, currentLotteryId }));
    }

  }, [dispatch, currentLotteryId, account]);
}

export const useLottery = () => {
  const currentRound = useSelector((state: State) => state.lottery.currentRound);
  const processedCurrentRound = useProcessStandardLotteryResponse(currentRound);

  const isTransitioning = useSelector((state: State) => state.lottery.isTransitioning);

  const currentLotteryId = useGetCurrentStandardLotteryId();

  const maxNumberTicketsPerBuyOrClaimAsString = useSelector(
    (state: State) => state.lottery.maxNumberTicketsPerBuyOrClaim
  );
  const maxNumberTicketsPerBuyOrClaim = useMemo(() => {
    return new BigNumber(maxNumberTicketsPerBuyOrClaimAsString)
  }, [maxNumberTicketsPerBuyOrClaimAsString]);

  return {
    isTransitioning,
    currentLotteryId,
    maxNumberTicketsPerBuyOrClaim,
    currentRound: processedCurrentRound
  };
}

export const usePreviousStandardLottery = (lotteryId: string) => {
  const [previousRound, setPreviousRound] = useState<LotteryRound | null>(null);

  useEffect(() => {
    setPreviousRound(null);

    const fetchLotteryData = async () => {
      const lotteryData = await fetchLottery(lotteryId);
      const processedLotteryData = processStandardLotteryResponse(lotteryData);
      setPreviousRound(processedLotteryData);
    }

    const lotteryIdAsInt = parseInt(lotteryId, 10);
    if (lotteryIdAsInt > 0) {
      fetchLotteryData();
    }
  }, [lotteryId]);

  return {
    previousLotteryId: lotteryId,
    previousRound
  }
}