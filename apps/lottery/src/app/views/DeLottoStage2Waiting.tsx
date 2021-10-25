import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Text } from '../components/Text';
import { environment } from '../../environments/environment';

const DeLottoStage2Waiting = () => {
  const now = new Date();
  const startDate = new Date(0);
  startDate.setUTCFullYear(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCMonth() === 1
      ? environment.deGrandStartDayOnFebruary
      : environment.deGrandStartDay
  );
  const startOfNextMonthAsInt = startDate.getTime();

  return (
    <FlexLine className="md:flex-column justify-content-center align-items-center h-30rem">
      <i className="fad fa-alarm-clock mb-4" style={{ fontSize: '30px' }}></i>
      <EventCountDown
        nextEventTime={Math.floor(startOfNextMonthAsInt / 1000) + 501}
        timerFontSize="28px"
        titleFontSize="18px"
        postCountDownText="until the start"
      />
      <Text className="mt-3 text-center">
        Come back later to buy tickets for the DeRaffles second stage and
        DeGrand!
      </Text>
      <Button
        className="p-button-link p-0 mt-7"
        label="Read more about the 'Stage Two'"
      />
    </FlexLine>
  );
};

export default DeLottoStage2Waiting;
