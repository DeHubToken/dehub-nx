import { endOfMonth } from 'date-fns';
import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Header, Text } from '../components/Text';

const DeLottoStage1Waiting = () => {
  const startOfNextMonthAsInt = endOfMonth(new Date()).getTime(); // after 5 min

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
        Come back later to buy tickets for the DeLotto first stage.
      </Text>
      <Button
        className="p-button-link p-0 mt-7"
        label="Read more about the 'Stage One'"
      />
    </FlexLine>
  );
};

export default DeLottoStage1Waiting;
