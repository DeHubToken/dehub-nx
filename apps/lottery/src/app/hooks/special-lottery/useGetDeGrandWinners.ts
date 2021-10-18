import { useCallback, useState, useEffect } from 'react';

import { Hooks } from '@dehub/react/core';
import { useLottery } from '../../states/special-lottery/hooks';
import { LotteryTicketOwner } from '../../config/constants/types';
import { fetchUserDeGrandWinners } from '../../states/special-lottery/helpers';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  IN_PROGRESS = 'in-progress',
  SUCCESS = 'success'
}

const useGetDeGrandWinners = () => {
  const { account } = Hooks.useMoralisEthers();
  const { currentLotteryId, isTransitioning } = useLottery();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [winners, setWinners] = useState<LotteryTicketOwner[]>([]);

  useEffect(() => {
    setFetchStatus(FetchStatus.NOT_FETCHED);
  }, [account, isTransitioning]);

  const fetchAllWinners = useCallback(async () => {
    setFetchStatus(FetchStatus.IN_PROGRESS);
    const winnersResponse = await fetchUserDeGrandWinners(currentLotteryId);
    setWinners(winnersResponse);
    setFetchStatus(FetchStatus.SUCCESS);
  }, [currentLotteryId]);

  return { fetchAllWinners, winners, fetchStatus };
}

export default useGetDeGrandWinners;