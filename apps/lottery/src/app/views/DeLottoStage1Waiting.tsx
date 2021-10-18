import { endOfMonth } from 'date-fns';
import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Title, Text } from '../components/Text';

const DeLottoStage1Waiting = () => {
  const startOfNextMonthAsInt = endOfMonth(new Date()).getTime(); // after 5 min

  return (
    <FlexLine className="md:flex-column justify-content-center align-items-center">
      <EventCountDown
        nextEventTime={Math.floor(startOfNextMonthAsInt / 1000) + 501}
        preCountDownText="Starts in "
        isVertical={false}
      />
      <Text>Come back later to buy tickets for the DeLotto first stage.</Text>
      <Button className="p-button-link p-0 mt-7" label="Read more" />
    </FlexLine>
  );
};

export default DeLottoStage1Waiting;
