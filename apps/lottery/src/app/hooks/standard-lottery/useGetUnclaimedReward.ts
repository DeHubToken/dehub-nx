import { useCallback, useState, useEffect, useRef } from 'react';

import { Hooks } from '@dehub/react/core';
import { useLottery } from '../../states/standard-lottery/hooks';
import { fetchUnclaimedUserRewards } from '../../states/standard-lottery/fetchUnclaimedUserRewards';
import { MAX_DELOTTO_REQUEST_SIZE } from '../../config/constants';
import { LotteryTicketClaimData } from '../../config/constants/types';

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
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    }
  }, []);

  useEffect(() => {
    setFetchStatus(FetchStatus.NOT_FETCHED);
  }, [account, isTransitioning]);

  const fetchAllRewards = useCallback(async (lotteryId: string) => {
    if (account && mountedRef.current) {
      setFetchStatus(FetchStatus.IN_PROGRESS);
      const unclaimedRewardsResponse = await fetchUnclaimedUserRewards(
        account,
        lotteryId,
        MAX_DELOTTO_REQUEST_SIZE
      );
      if (!mountedRef.current) {
        return;
      }
      setUnclaimedRewards(unclaimedRewardsResponse);
      setFetchStatus(FetchStatus.SUCCESS);
    }
  }, [account]);

  return { fetchAllRewards, unclaimedRewards, fetchStatus };
}

export default useGetUnclaimedRewards;