import { Text } from '@dehub/react/ui';
import { useEffect, useRef, useState } from 'react';
import getTimePeriods from '../../../utils/getTimePeriods';
import Timer from './Timer';

interface SimpleCountDownProps {
  limitTime: number;
}

const SimpleCountDown = ({ limitTime }: SimpleCountDownProps) => {
  const timer: { current: NodeJS.Timeout | null } = useRef(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining);

  useEffect(() => {
    const currentSeconds = Math.floor(Date.now() / 1000);
    const secondsRemainingCalc =
      limitTime < currentSeconds ? 0 : limitTime - currentSeconds;
    setSecondsRemaining(secondsRemainingCalc);

    timer.current = setInterval(() => {
      setSecondsRemaining(prevSecondsRemaining => {
        if (prevSecondsRemaining <= 1) {
          clearInterval(timer.current as NodeJS.Timeout);
        }
        return prevSecondsRemaining > 0 ? prevSecondsRemaining - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, [limitTime, timer]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {secondsRemaining ? (
        <div className="flex flex-column align-items-center">
          <Timer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
            style={{ fontSize: '14px' }}
          />
        </div>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default SimpleCountDown;
