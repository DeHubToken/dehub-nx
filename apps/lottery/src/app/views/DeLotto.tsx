import styled from 'styled-components';
import { TabView, TabPanel } from 'primereact/tabview';

import DeLottoStage1 from './DeLottoStage1';
import DeLottoStage1Waiting from './DeLottoStage1Waiting';
import DeLottoStage2 from './DeLottoStage2';
import DeLottoStage2Waiting from './DeLottoStage2Waiting';
import Box from '../components/Layout/Box';
import Container from '../components/Layout/Container';

import { LotteryStatus } from '../config/constants/types';
import {
  useFetchPaused,
  useGetSpecialPaused,
  useGetStandardPaused,
} from '../states/pause/hooks';
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
  // pause status
  useFetchPaused();

  // standard lottery
  useFetchStandardLottery();
  useStandardLotteryStatusTransitions();

  // special lottery
  useFetchSpecialLottery();
  useSpecialLotteryStatusTransitions();

  const {
    currentRound: { status: standardStatus, endTime: standardEndTime },
  } = useStandardLottery();
  const {
    currentRound: { deLottoStatus: specialStatus, endTime: specialEndTime },
  } = useSpecialLottery();
  const endTimeAsInt = parseInt(standardEndTime, 10);
  const specialEndTimeAsInt = parseInt(specialEndTime, 10);
  const standardPaused = useGetStandardPaused();
  const specialPaused = useGetSpecialPaused();

  const isActiveStage1 =
    isNaN(specialEndTimeAsInt) || endTimeAsInt >= specialEndTimeAsInt;
  const isActiveStage2 =
    isNaN(endTimeAsInt) || endTimeAsInt < specialEndTimeAsInt;
  const activeIndex = isActiveStage2 ? 1 : 0;

  return (
    <StyledContainer>
      <h1>DeLotto</h1>
      <TabView activeIndex={activeIndex}>
        <TabPanel header="STAGE ONE">
          <StyledBox>
            {isActiveStage1 ? (
              <DeLottoStage1 />
            ) : (
              <DeLottoStage1Waiting paused={standardPaused} />
            )}
          </StyledBox>
        </TabPanel>

        <TabPanel header="STAGE TWO">
          <StyledBox>
            {isActiveStage2 ? (
              <DeLottoStage2 />
            ) : (
              <DeLottoStage2Waiting paused={specialPaused} />
            )}
          </StyledBox>
        </TabPanel>
      </TabView>
    </StyledContainer>
  );
};

export default DeLotto;
