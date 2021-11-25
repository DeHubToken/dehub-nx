import { useEffect } from 'react';
import usePrevious from '../usePrevious';
import { LotteryStatus } from '../../config/constants/types';
import { useAppDispatch } from '../../states';
import { useLottery } from '../../states/standard-raffle/hooks';
import {
  fetchCurrentLottery,
  fetchCurrentLotteryId,
} from '../../states/standard-raffle';

const useStatusTransitions = () => {
  const {
    currentLotteryId,
    isTransitioning,
    currentRound: { status },
  } = useLottery();

  const dispatch = useAppDispatch();
  const previousStatus = usePrevious(status);

  useEffect(() => {
    /*
     * Current raffle is CLAIMABLE and the raffle is transitioninig to a NEW round,
     * fetch current raffle Id every 10 seconds.
     * The isTransitioning condition will no longer be true when fetchCurrentLotteryId returns the next raffle Id
     */
    if (
      previousStatus === LotteryStatus.CLAIMABLE &&
      status === LotteryStatus.CLAIMABLE &&
      isTransitioning
    ) {
      dispatch(fetchCurrentLotteryId());
      dispatch(fetchCurrentLottery({ currentLotteryId }));
      const interval = setInterval(async () => {
        dispatch(fetchCurrentLotteryId());
        dispatch(fetchCurrentLottery({ currentLotteryId }));
      }, 10000);
      return () => clearInterval(interval);
    }
    return () => null;
  }, [status, previousStatus, isTransitioning, currentLotteryId, dispatch]);
};

export default useStatusTransitions;
