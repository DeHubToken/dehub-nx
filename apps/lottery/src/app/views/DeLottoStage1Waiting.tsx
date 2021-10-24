import { endOfMonth } from 'date-fns';
import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Title, Text } from '../components/Text';

interface DeLottoStage1WaitingProps {
  paused?: boolean;
}

const DeLottoStage1Waiting = ({
  paused = false,
}: DeLottoStage1WaitingProps) => {
  const startOfNextMonthAsInt = endOfMonth(new Date()).getTime(); // after 5 min

  return (
    <FlexLine className="md:flex-column justify-content-center align-items-center">
      {paused ? (
        <Title className="mt-3">
          DeLotto is paused for a while. Please wait...
        </Title>
      ) : (
        <>
          <EventCountDown
            nextEventTime={Math.floor(startOfNextMonthAsInt / 1000) + 501}
            postCountDownText="left until start"
            isVertical={false}
          />
          <Text className="mt-3">
            Come back later to buy tickets for the DeLotto first stage.
          </Text>
          <Button className="p-button-link p-0 mt-7" label="Read more" />
        </>
      )}
    </FlexLine>
  );
};

export default DeLottoStage1Waiting;
