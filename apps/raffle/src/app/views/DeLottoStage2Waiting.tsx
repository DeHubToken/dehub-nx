import { Text } from '@dehub/react/ui';
import { Button } from 'primereact/button';
import { environment } from '../../environments/environment';
import Icon from '../components/Icon/Icon';
import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';

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
  const startOfNextMonthAsInt = startThisMonth.getTime();

  return (
    <FlexLine className="md:flex-column justify-content-center align-items-center h-30rem">
      <Icon className="fad fa-alarm-clock mb-5" size="40px"></Icon>
      <EventCountDown
        nextEventTime={Math.floor(startOfNextMonthAsInt / 1000) + 301}
        timerFontSize="28px"
        titleFontSize="18px"
        postCountDownText="until the start"
      />
      <Text className="mt-3 text-center">
        Come back later to buy tickets for the second stage of DeRaffles and the
        DeGrand!
      </Text>
      <Button
        className="p-button-link p-0 mt-7"
        label="Read more about 'Stage Two'"
        onClick={() => {
          window.open(
            'https://www.dehub.net/uploads/DeHub%20Prize%20Draw%20Whitepaper%20-%20V1.pdf',
            '_blank'
          );
        }}
      />
    </FlexLine>
  );
};

export default DeLottoStage2Waiting;
