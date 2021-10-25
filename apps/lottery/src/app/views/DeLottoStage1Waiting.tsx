import { endOfMonth } from 'date-fns';
import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Header, Text } from '../components/Text';

const DeLottoStage1Waiting = () => {
  const startOfNextMonthAsInt = endOfMonth(new Date()).getTime(); // after 5 min

  return (
    <FlexLine className="md:flex-column justify-content-center align-items-center">
      <EventCountDown
        nextEventTime={Math.floor(startOfNextMonthAsInt / 1000) + 501}
        postCountDownText="left until start"
        titleFontSize="24px"
      />
      <Text className="mt-3 text-center">
        Come back later to buy tickets for the DeLotto first stage.
      </Text>
      <Button className="p-button-link p-0 mt-7" label="Read more" />
    </FlexLine>
  );
};

export default DeLottoStage1Waiting;
