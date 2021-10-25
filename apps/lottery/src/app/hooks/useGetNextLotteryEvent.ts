import { useEffect, useState } from 'react';
import { LotteryStatus } from '../config/constants/types';

interface LotteryEvent {
  nextEventTime: number;
  postCountDownText?: string;
}

const useGetNextLotteryEvent = (
  endTime: number,
  lotteryId: string,
  status: LotteryStatus
): LotteryEvent => {
  const vrfRequestTime = 180; // 3 min
  const secondsBetweenRounds = 300; // 5 min
  const transactionResolvingBuffer = 30; // Delay countdown by 30s to ensure contract transctions have been calculated and broadcast
  const [nextEvent, setNextEvent] = useState<LotteryEvent>({
    nextEventTime: 0,
    postCountDownText: undefined,
  });

  useEffect(() => {
    // Current lottery is active
    if (status === LotteryStatus.OPEN) {
      setNextEvent({
        nextEventTime: endTime + transactionResolvingBuffer,
        postCountDownText: 'until the draw.',
      });
    }

    // Current lottery has finished, but not yet claimable
    if (status === LotteryStatus.CLOSE) {
      setNextEvent({
        nextEventTime: endTime + transactionResolvingBuffer + vrfRequestTime,
        postCountDownText: 'closing the round...',
      });
    }

    // Current lottery claimable, Next lottery has not yet started
    if (status === LotteryStatus.CLAIMABLE) {
      setNextEvent({
        nextEventTime:
          endTime + transactionResolvingBuffer + secondsBetweenRounds,
        postCountDownText: 'drawing numbers...',
      });
    }
  }, [lotteryId, status, endTime]);

  return nextEvent;
};

export default useGetNextLotteryEvent;
