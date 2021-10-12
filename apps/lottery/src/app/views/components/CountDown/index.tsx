import Timer from './Timer';
import { Header } from '../../../components/Text';
import useNextEventCountDown from '../../../hooks/useNextEventCountDown';
import getTimePeriods from '../../../utils/getTimePeriods';

interface CountDownProps {
  nextEventTime: number;
  countDownText: string;
}

const CountDown = ({ nextEventTime, countDownText }: CountDownProps) => {
  const secondsRemaining = useNextEventCountDown(nextEventTime);
  const { days, hours, minutes } = getTimePeriods(secondsRemaining);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {secondsRemaining ? (
        <div className="flex flex-column align-items-center">
          <Timer minutes={minutes + 1} hours={hours} days={days} />
          {countDownText && <Header>{countDownText}</Header>}
        </div>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </>
  );
};

export default CountDown;
