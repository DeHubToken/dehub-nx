import { useCallback, useState, useEffect, useRef } from 'react';

import { Hooks } from '@dehub/react/core';
import { useLottery } from '../../states/special-raffle/hooks';
import { LotteryTicketClaimData } from '../../config/constants/types';
import { fetchUserDeLottoWinningRewards } from '../../states/special-raffle/helpers';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  IN_PROGRESS = 'in-progress',
  SUCCESS = 'success',
}

const useGetDeLottoWinningRewards = () => {
  const { account } = Hooks.useMoralisEthers();
  const { currentLotteryId, isTransitioning } = useLottery();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [winningRewards, setWinningRewards] =
    useState<LotteryTicketClaimData | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setFetchStatus(FetchStatus.NOT_FETCHED);
  }, [account, isTransitioning]);

  const fetchAllRewards = useCallback(async () => {
    if (account && mountedRef.current) {
      setFetchStatus(FetchStatus.IN_PROGRESS);
      const winningRewardsResponse = await fetchUserDeLottoWinningRewards(
        account,
        currentLotteryId
      );
      if (!mountedRef.current) {
        return;
      }
      setWinningRewards(winningRewardsResponse);
      setFetchStatus(FetchStatus.SUCCESS);
    }
  }, [account, currentLotteryId]);

  return { fetchAllRewards, winningRewards, fetchStatus };
};

export default useGetDeLottoWinningRewards;
