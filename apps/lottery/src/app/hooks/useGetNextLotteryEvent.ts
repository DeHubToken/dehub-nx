import { useEffect, useState } from 'react';
import { LotteryStatus } from '../config/constants/types';

interface LotteryEvent {
  nextEventTime: number;
  preCountDownText?: string;
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
    preCountDownText: undefined,
    postCountDownText: undefined
  });

  useEffect(() => {
    // Current lottery is active
    if (status === LotteryStatus.OPEN) {
      setNextEvent({
        nextEventTime: endTime + transactionResolvingBuffer,
        preCountDownText: undefined,
        postCountDownText: 'until the draw'
      });
    }

    // Current lottery has finished, but not yet claimable
    if (status === LotteryStatus.CLOSE) {
      setNextEvent({
        nextEventTime: endTime + transactionResolvingBuffer + vrfRequestTime,
        preCountDownText: `Closing Round #${lotteryId}`,
        postCountDownText: undefined
      });
    }

    // Current lottery claimable, Next lottery has not yet started
    if (status === LotteryStatus.CLAIMABLE) {
      setNextEvent({
        nextEventTime: endTime + transactionResolvingBuffer + secondsBetweenRounds,
        preCountDownText: `Drawing Numbers for Round #${lotteryId}`,
        postCountDownText: undefined
      });
    }

  }, [lotteryId, status, endTime]);

  return nextEvent;
}

export default useGetNextLotteryEvent;