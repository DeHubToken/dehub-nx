import { useCallback, useState, useEffect } from 'react';

import { Hooks } from '@dehub/react/core';
import { useLottery } from '../../states/special-lottery/hooks';
import { LotteryTicketClaimData } from '../../config/constants/types';
import { fetchUserDeLottoWinningRewards } from '../../states/special-lottery/helpers';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  IN_PROGRESS = 'in-progress',
  SUCCESS = 'success'
}

const useGetDeLottoWinningRewards = () => {
  const { account } = Hooks.useMoralisEthers();
  const { currentLotteryId, isTransitioning } = useLottery();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [winningRewards, setWinningRewards] = useState<LotteryTicketClaimData | null>(null);

  useEffect(() => {
    setFetchStatus(FetchStatus.NOT_FETCHED);
  }, [account, isTransitioning]);

  const fetchAllRewards = useCallback(async () => {
    if (account) {
      setFetchStatus(FetchStatus.IN_PROGRESS);
      const winningRewardsResponse = await fetchUserDeLottoWinningRewards(
        account,
        currentLotteryId
      );
      setWinningRewards(winningRewardsResponse);
      setFetchStatus(FetchStatus.SUCCESS);
    }
  }, [account, currentLotteryId]);

  return { fetchAllRewards, winningRewards, fetchStatus };
}

export default useGetDeLottoWinningRewards;