import { endOfMonth } from 'date-fns';
import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Text } from '../components/Text';
import { utcToLocal } from '../utils/dateHelpers';

const DeLottoStage1Waiting = () => {
  const startOfNextMonthAsInt = utcToLocal(
    endOfMonth(new Date()).getTime()
  ).getTime(); // after 5 min

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
