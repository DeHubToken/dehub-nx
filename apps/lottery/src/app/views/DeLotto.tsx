import styled from 'styled-components';
import { TabView, TabPanel } from 'primereact/tabview';

import DeLottoStage1 from './DeLottoStage1';
import DeLottoStage1Waiting from './DeLottoStage1Waiting';
import DeLottoStage2 from './DeLottoStage2';
import DeLottoStage2Waiting from './DeLottoStage2Waiting';
import Box from '../components/Layout/Box';
import Container from '../components/Layout/Container';

import useStandardLotteryStatusTransitions from '../hooks/standard-lottery/useStatusTransitions';
import useSpecialLotteryStatusTransitions from '../hooks/special-lottery/useStatusTransitions';
import {
  useFetchLottery as useFetchStandardLottery,
  useLottery as useStandardLottery,
} from '../states/standard-lottery/hooks';
import {
  useFetchLottery as useFetchSpecialLottery,
  useLottery as useSpecialLottery,
} from '../states/special-lottery/hooks';

const StyledContainer = styled(Container)`
  .p-tabview .p-tabview-nav li {
    width: 50%;
  }
`;

const StyledBox = styled(Box)`
  padding: 1rem;
`;

const DeLotto = () => {
  // standard lottery
  useFetchStandardLottery();
  useStandardLotteryStatusTransitions();

  // special lottery
  useFetchSpecialLottery();
  useSpecialLotteryStatusTransitions();

  const {
    currentRound: { endTime: standardEndTime },
  } = useStandardLottery();
  const {
    currentRound: { endTime: specialEndTime },
  } = useSpecialLottery();
  const endTimeAsInt = parseInt(standardEndTime, 10);
  const specialEndTimeAsInt = parseInt(specialEndTime, 10);

  return (
    <StyledContainer>
      <h1>DeLotto</h1>
      <TabView>
        <TabPanel header="STAGE #1">
          <StyledBox>
            {endTimeAsInt >= specialEndTimeAsInt ? (
              <DeLottoStage1 />
            ) : (
              <DeLottoStage1Waiting />
            )}
          </StyledBox>
        </TabPanel>

        <TabPanel header="STAGE #2">
          <StyledBox>
            {endTimeAsInt < specialEndTimeAsInt ? (
              <DeLottoStage2 />
            ) : (
              <DeLottoStage2Waiting />
            )}
          </StyledBox>
        </TabPanel>
      </TabView>
    </StyledContainer>
  );
};

export default DeLotto;
