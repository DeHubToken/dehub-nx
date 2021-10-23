import Timer from './Timer';
import { Title } from '../../../components/Text';
import useNextEventCountDown from '../../../hooks/standard-lottery/useNextEventCountDown';
import getTimePeriods from '../../../utils/getTimePeriods';

interface EventCountDownProps {
  nextEventTime: number;
  headerText?: string;
  headerFontSize?: string;
  preCountDownText?: string;
  postCountDownText?: string;
  titleFontSize?: string;
  timerFontSize?: string;
  isVertical?: boolean;
}

const EventCountDown = ({
  nextEventTime,
  headerText,
  headerFontSize,
  preCountDownText,
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
      <div className={`flex ${isVertical ? 'flex-column' : 'flex-row'}`}>
        <div className="card overview-box gray">
          <div className="overview-info pr-4 text-left">
            {secondsRemaining ? (
              <>
                {headerText && (
                  <Title style={{ fontSize: headerFontSize, fontWeight: 900 }}>
                    {headerText}
                  </Title>
                )}

                <Title style={{ fontSize: titleFontSize }}>
                  {preCountDownText || '\u00A0'}
                </Title>

                <Timer
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
          </div>
          <i className="fad fa-clock"></i>
        </div>
      </div>
    </>
  );
};

export default EventCountDown;
