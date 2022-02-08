import { Flex } from '@dehub/react/pcsuikit';
import React from 'react';
import styled from 'styled-components';
import FlexRow from './FlexRow';
import HistoryButton from './HistoryButton';
import { PricePairLabel, TimerLabel } from './Label';
import PrevNextNav from './PrevNextNav';

const SetCol = styled.div`
  flex: none;
  width: auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 270px;
  }
`;

const TimerLabelWrapper = styled.div`
  order: 2;

  ${({ theme }) => theme.mediaQueries.lg} {
    order: 1;
  }
`;

const HistoryButtonWrapper = styled.div`
  display: none;
  order: 3;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: initial;
  }
`;

const Menu = () => {
  return (
    <FlexRow alignItems="center" p="16px">
      <SetCol>
        <PricePairLabel />
      </SetCol>
      <FlexRow justifyContent="center">
        <PrevNextNav />
      </FlexRow>
      <SetCol>
        <Flex alignItems="center" justifyContent="flex-end">
          <TimerLabelWrapper>
            <TimerLabel interval="1h" />
          </TimerLabelWrapper>
          {/* <HelpButtonWrapper>
            <IconButton
              variant="subtle"
              as="a"
              href="https://prediction-dehub.netlify.app/prediction/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <HelpIcon width="24px" color="white" />
            </IconButton>
          </HelpButtonWrapper> */}
          <HistoryButtonWrapper>
            <HistoryButton />
          </HistoryButtonWrapper>
        </Flex>
      </SetCol>
    </FlexRow>
  );
};

export default Menu;
