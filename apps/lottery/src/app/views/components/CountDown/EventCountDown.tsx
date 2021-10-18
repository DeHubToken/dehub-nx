import Timer from './Timer';
import { Title } from '../../../components/Text';
import useNextEventCountDown from '../../../hooks/standard-lottery/useNextEventCountDown';
import getTimePeriods from '../../../utils/getTimePeriods';

interface EventCountDownProps {
  nextEventTime: number;
  preCountDownText?: string;
  postCountDownText?: string;
  titleFontSize?: string;
  timerFontSize?: string;
  isVertical?: boolean;
}

const EventCountDown = ({
  nextEventTime,
  preCountDownText,
  postCountDownText,
  titleFontSize = '30px',
  timerFontSize = '30px',
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
          {preCountDownText && (
            <Title style={{ fontSize: titleFontSize }}>
              {preCountDownText}
            </Title>
          )}
          <Timer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
            style={{ fontSize: timerFontSize }}
          />
          {postCountDownText && (
            <Title style={{ fontSize: titleFontSize }}>
              {postCountDownText}
            </Title>
          )}
        </div>
      ) : (
        <Title style={{ fontSize: titleFontSize }}>Loading...</Title>
      )}
    </>
  );
};

export default EventCountDown;
