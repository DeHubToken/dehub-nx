import { useEffect, useState } from 'react';
import { LotteryStatus } from '../config/constants/types';

interface LotteryEvent {
  nextEventTime: number;
  countDownText?: string;
}

const useGetNextLotteryEvent = (endTime: number, status: LotteryStatus): LotteryEvent => {
  const vrfRequestTime = 180; // 3 min
  const secondsBetweenRounds = 300; // 5 min
  const transactionResolvingBuffer = 30; // Delay countdown by 30s to ensure contract transctions have been calculated and broadcast
  const [nextEvent, setNextEvent] = useState<LotteryEvent>({
    nextEventTime: 0,
    countDownText: ''
  });

  useEffect(() => {
    // Current lottery is active
    if (status === LotteryStatus.OPEN) {
      setNextEvent({
        nextEventTime: endTime + transactionResolvingBuffer,
        countDownText: 'until the draw'
      });
    }

    // Current lottery has finished, but not yet claimable
    if (status === LotteryStatus.CLOSE) {
      setNextEvent({
        nextEventTime: endTime + transactionResolvingBuffer + vrfRequestTime,
        countDownText: 'Winners announced in'
      });
    }

    // Current lottery claimable, Next lottery has not yet started
    if (status === LotteryStatus.CLAIMABLE) {
      setNextEvent({
        nextEventTime: endTime + transactionResolvingBuffer + secondsBetweenRounds,
        countDownText: 'Tickets on sale in'
      });
    }

  }, [status, endTime]);

  return nextEvent;
}

export default useGetNextLotteryEvent;