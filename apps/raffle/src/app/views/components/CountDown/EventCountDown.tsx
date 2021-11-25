import { Title } from '../../../components/Text';
import useNextEventCountDown from '../../../hooks/standard-raffle/useNextEventCountDown';
import getTimePeriods from '../../../utils/getTimePeriods';
import Timer from './Timer';

interface EventCountDownProps {
  nextEventTime: number;
  headerText?: string;
  headerFontSize?: string;
  postCountDownText?: string;
  titleFontSize?: string;
  timerFontSize?: string;
  waiting?: string;
}

const EventCountDown = ({
  nextEventTime,
  postCountDownText,
  titleFontSize = '14px',
  timerFontSize = '22px',
  waiting = 'Waiting...',
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
          <Title
            style={{
              fontSize: titleFontSize,
              fontWeight: 900,
              color: 'orange',
            }}
          >
            {postCountDownText || '\u00A0'}
          </Title>
        </>
      ) : (
        <Title style={{ fontSize: titleFontSize }}>{waiting}</Title>
      )}
    </>
  );
};

export default EventCountDown;
