import Timer from './Timer';
import { Header } from '../../../components/Text';
import useNextEventCountDown from '../../../hooks/standard-lottery/useNextEventCountDown';
import getTimePeriods from '../../../utils/getTimePeriods';

interface EventCountDownProps {
  nextEventTime: number;
  preCountDownText?: string;
  postCountDownText?: string;
}

const EventCountDown = ({
  nextEventTime,
  preCountDownText,
  postCountDownText,
}: EventCountDownProps) => {
  const secondsRemaining = useNextEventCountDown(nextEventTime);
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {secondsRemaining ? (
        <div className="flex flex-column align-items-center">
          {preCountDownText && (
            <Header style={{ fontSize: '30px' }}>{preCountDownText}</Header>
          )}
          <Timer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
            style={{ fontSize: `${postCountDownText ? '30px' : '14px'}` }}
          />
          {postCountDownText && (
            <Header style={{ fontSize: '30px' }}>{postCountDownText}</Header>
          )}
        </div>
      ) : (
        <h1 className="text-center" style={{ fontSize: '30px' }}>
          Loading...
        </h1>
      )}
    </>
  );
};

export default EventCountDown;
