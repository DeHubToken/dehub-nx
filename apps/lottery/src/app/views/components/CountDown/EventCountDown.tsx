import Timer from './Timer';
import { Header } from '../../../components/Text';
import useNextEventCountDown from '../../../hooks/useNextEventCountDown';
import getTimePeriods from '../../../utils/getTimePeriods';

interface EventCountDownProps {
  nextEventTime: number;
  countDownText: string;
}

const EventCountDown = ({
  nextEventTime,
  countDownText,
}: EventCountDownProps) => {
  const secondsRemaining = useNextEventCountDown(nextEventTime);
  const { days, hours, minutes } = getTimePeriods(secondsRemaining);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {secondsRemaining ? (
        <div className="flex flex-column align-items-center">
          <Timer
            minutes={minutes}
            hours={hours}
            days={days}
            style={{ fontSize: '30px' }}
          />
          {countDownText && <Header>{countDownText}</Header>}
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
