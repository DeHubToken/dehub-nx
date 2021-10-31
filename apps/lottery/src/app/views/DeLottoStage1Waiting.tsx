import { addMonths } from 'date-fns';
import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Text } from '../components/Text';

const DeLottoStage1Waiting = () => {
  const now = new Date();
  const startThisMonth = new Date(0);
  startThisMonth.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const startOfNextMonthAsInt = addMonths(
    startThisMonth.getTime(),
    1
  ).getTime();

  return (
    <FlexLine className="md:flex-column justify-content-center align-items-center h-30rem">
      <i className="fad fa-alarm-clock mb-4" style={{ fontSize: '30px' }}></i>
      <EventCountDown
        nextEventTime={Math.floor(startOfNextMonthAsInt / 1000) + 301}
        timerFontSize="28px"
        titleFontSize="18px"
        postCountDownText="until the start"
      />
      <Text className="mt-3 text-center">
        Come back later to buy tickets for the DeRaffles first stage.
      </Text>
      <Button
        className="p-button-link p-0 mt-7"
        label="Read more about the 'Stage One'"
      />
    </FlexLine>
  );
};

export default DeLottoStage1Waiting;
