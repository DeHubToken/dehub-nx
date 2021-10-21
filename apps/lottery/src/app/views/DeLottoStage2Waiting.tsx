import { Button } from 'primereact/button';

import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import { Text } from '../components/Text';
import { environment } from '../../environments/environment';

interface DeLottoStage1WaitingProps {
  paused?: boolean;
}

const DeLottoStage2Waiting = ({
  paused = false,
}: DeLottoStage1WaitingProps) => {
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
    <FlexLine className="md:flex-column justify-content-center align-items-center">
      {paused ? (
        <Text>DeLotto is paused for a while. Please wait...</Text>
      ) : (
        <>
          <EventCountDown
            nextEventTime={Math.floor(startOfNextMonthAsInt / 1000) + 501}
            preCountDownText="Starts in "
            isVertical={false}
          />
          <Text>
            Come back later to buy tickets for the DeLotto second stage and
            DeGrand!
          </Text>
          <Button className="p-button-link p-0 mt-7" label="Read more" />
        </>
      )}
    </FlexLine>
  );
};

export default DeLottoStage2Waiting;
