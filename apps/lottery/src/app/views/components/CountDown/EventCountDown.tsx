import Timer from './Timer';
import { Title } from '../../../components/Text';
import useNextEventCountDown from '../../../hooks/standard-lottery/useNextEventCountDown';
import getTimePeriods from '../../../utils/getTimePeriods';

interface EventCountDownProps {
  nextEventTime: number;
  headerText?: string;
  headerFontSize?: string;
  postCountDownText?: string;
  titleFontSize?: string;
  timerFontSize?: string;
  isVertical?: boolean;
}

const EventCountDown = ({
  nextEventTime,
  postCountDownText,
  titleFontSize = '14px',
  timerFontSize = '24px',
  isVertical = true,
}: EventCountDownProps) => {
  const secondsRemaining = useNextEventCountDown(nextEventTime);
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {secondsRemaining ? (
        <>
          <Timer
            className="pb-1"
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
            style={{ fontSize: timerFontSize }}
          />
          <Title style={{ fontSize: titleFontSize }}>
            {postCountDownText || '\u00A0'}
          </Title>
        </>
      ) : (
        <Title style={{ fontSize: titleFontSize }}>Waiting...</Title>
      )}
    </>
  );
};

export default EventCountDown;
