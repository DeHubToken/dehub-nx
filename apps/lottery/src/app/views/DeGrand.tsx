import React, { useEffect, useState } from 'react';
import { endOfMonth } from 'date-fns';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { Hooks } from '@dehub/react/core';

import ClaimDeGrandDialog from './components/ClaimDeGrandDialog';
import DeGrandHistoryDialog from './components/DeGrandHistoryDialog';
import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import Box from '../components/Layout/Box';
import ConnectWalletButton from '../components/ConnectWalletButton';
import Container from '../components/Layout/Container';
import { Title, Header, Text } from '../components/Text';
import { useGetSpecialPaused } from '../states/pause/hooks';
import {
  useLottery,
  useThisMonthDeGrandPrize,
} from '../states/special-lottery/hooks';
import { LotteryStatus } from '../config/constants/types';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

const DeGrand = () => {
  const specialPaused = useGetSpecialPaused();
  const {
    currentRound: { deGrandStatus, endTime },
  } = useLottery();
  const endTimeAsInt = parseInt(endTime, 10);
  const lotteryMonthAsInt = new Date(endTimeAsInt * 1000).getUTCMonth();
  const currentMonthAsInt = new Date().getUTCMonth();

  const deGrandPrize = useThisMonthDeGrandPrize();

  const { account } = Hooks.useMoralisEthers();
  const [checkDeGrandDialog, setCheckDeGrandDialog] = useState(false);
  const [checkDeGrandHistoryDialog, setCheckDeGrandHistoryDialog] =
    useState(false);
  const currentSeconds = Math.floor(Date.now() / 1000);

  const handleShowDialog = (dialogKind: string) => {
    if (dialogKind === 'CheckDeGrand') {
      setCheckDeGrandDialog(true);
    } else if (dialogKind === 'CheckDeGrandHistory') {
      setCheckDeGrandHistoryDialog(true);
    }
  };
  const handleHideDialog = (dialogKind: string) => {
    if (dialogKind === 'CheckDeGrand') {
      setCheckDeGrandDialog(false);
    } else if (dialogKind === 'CheckDeGrandHistory') {
      setCheckDeGrandHistoryDialog(false);
    }
  };

  return (
    <Container>
      <h1>DeGrand</h1>
      <Card>
        <StyledBox>
          {specialPaused ? (
            <Title>DeGrand is paused for a while. Please wait...</Title>
          ) : (
            <>
              {deGrandPrize && deGrandPrize.drawTime > 0 ? (
                <FlexLine
                  className="md:flex-column align-items-center justify-content-center"
                  style={{ borderBottom: '1px solid' }}
                >
                  <Header>DeGrand prize this month:</Header>
                  {deGrandPrize.imageUrl && (
                    <img
                      src={deGrandPrize.imageUrl}
                      style={{ width: '100%', height: '100%' }}
                      alt="DeGrand prize this month"
                    />
                  )}
                  <FlexLine className="justify-content-between w-full">
                    <FlexLine className="md:flex-column">
                      <Header>{`${deGrandPrize.title} | ${deGrandPrize.maxWinnerCount} lucky winners will be announced`}</Header>
                      {lotteryMonthAsInt === currentMonthAsInt &&
                      deGrandStatus === LotteryStatus.CLAIMABLE ? (
                        <Text className="text-pink-400">Draw Completed!</Text>
                      ) : deGrandPrize &&
                        deGrandPrize.drawTime > currentSeconds ? (
                        <EventCountDown
                          nextEventTime={deGrandPrize.drawTime}
                          postCountDownText="until the draw"
                          isVertical={false}
                          titleFontSize="14px"
                          timerFontSize="14px"
                        />
                      ) : (
                        <Title fontSize="14px">Waiting...</Title>
                      )}
                    </FlexLine>
                    <FlexLine className="md:flex-column">
                      {account ? (
                        deGrandStatus === LotteryStatus.CLAIMABLE && (
                          <>
                            <Text>Are you a winner?</Text>
                            <Button
                              className="mt-2 justify-content-center"
                              onClick={() => handleShowDialog('CheckDeGrand')}
                              label="Check Now"
                            />
                          </>
                        )
                      ) : (
                        <ConnectWalletButton />
                      )}
                    </FlexLine>
                  </FlexLine>
                </FlexLine>
              ) : (
                <FlexLine
                  className="align-items-center justify-content-center py-2"
                  style={{ borderBottom: '1px solid' }}
                >
                  <Title>Prizes will be anounced soon!</Title>
                </FlexLine>
              )}
              <FlexLine className="md:flex-column align-items-center justify-content-between">
                <Header className="mt-2">Grand history</Header>
                <Text className="my-2">See previous DeGrand Draws</Text>
                {account ? (
                  deGrandPrize &&
                  deGrandPrize.drawTime > 0 && (
                    <Button
                      className="mt-2 justify-content-center"
                      onClick={() => handleShowDialog('CheckDeGrandHistory')}
                      label="Check Now"
                    />
                  )
                ) : (
                  <ConnectWalletButton />
                )}
              </FlexLine>
            </>
          )}
        </StyledBox>
      </Card>

      <ClaimDeGrandDialog
        open={checkDeGrandDialog}
        onHide={() => handleHideDialog('CheckDeGrand')}
      />

      <DeGrandHistoryDialog
        open={checkDeGrandHistoryDialog}
        onHide={() => handleHideDialog('CheckDeGrandHistory')}
      />
    </Container>
  );
};

export default DeGrand;
