import { useCallback, useState, useEffect, useRef } from 'react';

import { Hooks } from '@dehub/react/core';
import { useLottery } from '../../states/special-raffle/hooks';
import { LotteryTicketOwner } from '../../config/constants/types';
import { fetchUserDeGrandWinners } from '../../states/special-raffle/helpers';
import { MAX_DEGRAND_REQUEST_SIZE } from '../../config/constants';
import { fetchHistoricalDeGrands } from '../../states/special-raffle/fetchHistoricalDeGrands';
import { DeGrandHistory } from '../../states/special-raffle/types';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  IN_PROGRESS = 'in-progress',
  SUCCESS = 'success',
}

const useGetDeGrandWinners = () => {
  const { account } = Hooks.useMoralisEthers();
  const { isTransitioning } = useLottery();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [winners, setWinners] = useState<LotteryTicketOwner[]>([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setFetchStatus(FetchStatus.NOT_FETCHED);
  }, [account, isTransitioning]);

  const fetchAllWinners = useCallback(async (lotteryId: string) => {
    if (mountedRef.current) {
      setFetchStatus(FetchStatus.IN_PROGRESS);
      const winnersResponse = await fetchUserDeGrandWinners(lotteryId);
      if (!mountedRef.current) {
        return;
      }
      setWinners(winnersResponse);
      setFetchStatus(FetchStatus.SUCCESS);
    }
  }, []);

  return { fetchAllWinners, winners, fetchStatus };
};

export const useGetHistoricalDeGrands = () => {
  const { account } = Hooks.useMoralisEthers();
  const { isTransitioning } = useLottery();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [historicalDeGrands, setHistoricalDeGrands] = useState<
    DeGrandHistory[]
  >([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setFetchStatus(FetchStatus.NOT_FETCHED);
  }, [account, isTransitioning]);

  const fetchHistoricalAllWinners = useCallback(async (lotteryId: string) => {
    if (!mountedRef.current) {
      return;
    }
    setFetchStatus(FetchStatus.IN_PROGRESS);
    const winnersResponse = await fetchHistoricalDeGrands(
      lotteryId,
      MAX_DEGRAND_REQUEST_SIZE
    );
    if (!mountedRef.current) {
      return;
    }
    setHistoricalDeGrands(winnersResponse);
    setFetchStatus(FetchStatus.SUCCESS);
  }, []);

  return { fetchHistoricalAllWinners, historicalDeGrands, fetchStatus };
};

export default useGetDeGrandWinners;
