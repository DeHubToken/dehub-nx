import Timer from './Timer';
import { Title } from '../../../components/Text';
import useNextEventCountDown from '../../../hooks/standard-lottery/useNextEventCountDown';
import getTimePeriods from '../../../utils/getTimePeriods';

interface EventCountDownProps {
  nextEventTime: number;
  preCountDownText?: string;
  postCountDownText?: string;
  isVertical?: boolean;
}

const EventCountDown = ({
  nextEventTime,
  preCountDownText,
  postCountDownText,
  isVertical = true,
}: EventCountDownProps) => {
  const secondsRemaining = useNextEventCountDown(nextEventTime);
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {secondsRemaining ? (
        <div
          className={`flex ${
            isVertical ? 'flex-column' : 'flex-row'
          } align-items-center`}
        >
          {preCountDownText && <Title>{preCountDownText}</Title>}
          <Timer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
            style={{
              fontSize: `${
                preCountDownText || postCountDownText ? '30px' : '14px'
              }`,
            }}
          />
          {postCountDownText && <Title>{postCountDownText}</Title>}
        </div>
      ) : (
        <Title>Loading...</Title>
      )}
    </>
  );
};

export default EventCountDown;
