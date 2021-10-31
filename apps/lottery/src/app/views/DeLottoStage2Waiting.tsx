import { addMonths } from 'date-fns';
import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Text } from '../components/Text';
import { environment } from '../../environments/environment';
import Icon from '../components/Icon/Icon';

const DeLottoStage2Waiting = () => {
  const now = new Date();
  const startThisMonth = new Date(0);
  startThisMonth.setUTCFullYear(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCMonth() === 1
      ? environment.deGrandStartDayOnFebruary
      : environment.deGrandStartDay
  );
  const startOfNextMonthAsInt = addMonths(
    startThisMonth.getTime(),
    1
  ).getTime();

  return (
    <FlexLine className="md:flex-column justify-content-center align-items-center h-30rem">
      <Icon className="fad fa-alarm-clock mb-5" size="40px"></Icon>
      <EventCountDown
        nextEventTime={Math.floor(startOfNextMonthAsInt / 1000) + 501}
        timerFontSize="28px"
        titleFontSize="18px"
        postCountDownText="until the start"
      />
      <Text className="mt-3 text-center">
        Come back later to buy tickets for the DeRaffles second stage and the
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
