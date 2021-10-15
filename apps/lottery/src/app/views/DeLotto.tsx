import styled from 'styled-components';
import { TabView, TabPanel } from 'primereact/tabview';

import DeLottoStage1 from './DeLottoStage1';
import DeLottoStage2 from './DeLottoStage2';
import Box from '../components/Layout/Box';
import Container from '../components/Layout/Container';

import useStandardLotteryStatusTransitions from '../hooks/standard-lottery/useStatusTransitions';
import { useFetchLottery as useFetchStandardLottery } from '../states/standard-lottery/hooks';

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

  return (
    <StyledContainer>
      <h1>DeLotto</h1>
      <TabView>
        <TabPanel header="STAGE #1">
          <StyledBox>
            <DeLottoStage1 />
          </StyledBox>
        </TabPanel>

        <TabPanel header="STAGE #2">
          <StyledBox>
            <DeLottoStage2 />
          </StyledBox>
        </TabPanel>
      </TabView>
    </StyledContainer>
  );
};

export default DeLotto;
