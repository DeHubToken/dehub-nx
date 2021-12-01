import { useEffect, useState, useRef } from 'react';
import { useAppDispatch } from '../../states';
import { useLottery } from '../../states/special-raffle/hooks';
import {
  fetchCurrentLottery,
  setLotteryIsTransitioning,
} from '../../states/special-raffle';

const useNextEventCountDown = (nextEventTime: number): number => {
  const dispatch = useAppDispatch();
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const timer: { current: NodeJS.Timeout | null } = useRef(null);
  const { currentLotteryId } = useLottery();

  useEffect(() => {
    dispatch(setLotteryIsTransitioning({ isTransitioning: false }));
    const currentSeconds = Math.floor(Date.now() / 1000);
    const secondsRemainingCalc =
      nextEventTime < currentSeconds ? 0 : nextEventTime - currentSeconds;
    setSecondsRemaining(secondsRemainingCalc);

    timer.current = setInterval(() => {
      setSecondsRemaining(prevSecondsRemaining => {
        // Clear current interval at end of countdown and fetch current raffle to get updated state
        if (prevSecondsRemaining <= 1) {
          clearInterval(timer.current as NodeJS.Timeout);
          dispatch(setLotteryIsTransitioning({ isTransitioning: true }));
          dispatch(fetchCurrentLottery({ currentLotteryId }));
        }
        return prevSecondsRemaining > 0 ? prevSecondsRemaining - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, [setSecondsRemaining, nextEventTime, currentLotteryId, timer, dispatch]);

  return secondsRemaining;
};

export default useNextEventCountDown;
