import { useCallback, useState, useEffect } from 'react';

import { Hooks } from '@dehub/react/core';
import { useLottery } from '../states/standard-lottery/hooks';
import { fetchUnclaimedUserRewards } from '../states/standard-lottery/fetchUnclaimedUserRewards';
import { MAX_LOTTERIES_REQUEST_SIZE } from '../config/constants';
import { LotteryTicketClaimData } from '../config/constants/types';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  IN_PROGRESS = 'in-progress',
  SUCCESS = 'success'
}

const useGetUnclaimedRewards = () => {
  const { account } = Hooks.useMoralisEthers();
  const { isTransitioning } = useLottery();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [unclaimedRewards, setUnclaimedRewards] = useState<LotteryTicketClaimData[]>([]);

  useEffect(() => {
    setFetchStatus(FetchStatus.NOT_FETCHED);
  }, [account, isTransitioning]);

  const fetchAllRewards = useCallback(async (lotteryId: string) => {
    if (account) {
      setFetchStatus(FetchStatus.IN_PROGRESS);
      const unclaimedRewardsResponse = await fetchUnclaimedUserRewards(
        account,
        lotteryId,
        MAX_LOTTERIES_REQUEST_SIZE
      );
      setUnclaimedRewards(unclaimedRewardsResponse);
      setFetchStatus(FetchStatus.SUCCESS);
    }
  }, [account]);

  return { fetchAllRewards, unclaimedRewards, fetchStatus };
}

export default useGetUnclaimedRewards;