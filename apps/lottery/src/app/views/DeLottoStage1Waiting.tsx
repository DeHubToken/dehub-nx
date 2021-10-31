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
        Come back later to buy tickets for the first stage of DeRaffles.
      </Text>
      <Button
        className="p-button-link p-0 mt-7"
        label="Read more about 'Stage One'"
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

export default DeLottoStage1Waiting;
