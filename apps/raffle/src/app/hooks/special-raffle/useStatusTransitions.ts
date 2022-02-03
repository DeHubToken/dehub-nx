import { useEffect } from 'react';
import { LotteryStatus } from '../../config/constants/types';
import { useAppDispatch } from '../../states';
import {
  fetchCurrentLottery,
  fetchCurrentLotteryId,
} from '../../states/special-raffle';
import { useLottery } from '../../states/special-raffle/hooks';
import usePrevious from '../usePrevious';

const useStatusTransitions = () => {
  const {
    currentLotteryId,
    isTransitioning,
    currentRound: { deLottoStatus },
  } = useLottery();

  const dispatch = useAppDispatch();
  const previousStatus = usePrevious(deLottoStatus);

  useEffect(() => {
    /*
     * Current raffle is CLAIMABLE and the raffle is transitioninig to a NEW round,
     * fetch current raffle Id every 10 seconds.
     * The isTransitioning condition will no longer be true when fetchCurrentLotteryId returns the next raffle Id
     */
    if (
      ((previousStatus === LotteryStatus.CLAIMABLE &&
        deLottoStatus === LotteryStatus.CLAIMABLE) ||
        (previousStatus === LotteryStatus.BURNED &&
          deLottoStatus === LotteryStatus.BURNED)) &&
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
  }, [
    deLottoStatus,
    previousStatus,
    isTransitioning,
    currentLotteryId,
    dispatch,
  ]);
};

export default useStatusTransitions;
