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
import { LoadingStatus, LotteryStatus } from '../config/constants/types';
import SyncWaiting from './SyncWaiting';
import Icon from '../components/Icon/Icon';

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

  const loadingStatus =
    deGrandStatus === LotteryStatus.PENDING && isNaN(endTimeAsInt)
      ? LoadingStatus.LOADING
      : specialPaused
      ? LoadingStatus.PAUSED
      : !isNaN(endTimeAsInt) && deGrandPrize
      ? LoadingStatus.COMPLETE
      : LoadingStatus.SYNCHRONIZING;

  return (
    <Container>
      <h1>DeGrand</h1>
      {loadingStatus !== LoadingStatus.COMPLETE ? (
        <SyncWaiting loadingStatus={loadingStatus} />
      ) : (
        <Card
          className="border-neon-2 overflow-hidden"
          header={
            deGrandPrize.imageUrl && (
              <img src={deGrandPrize.imageUrl} alt="DeGrand prize this month" />
            )
          }
        >
          <StyledBox>
            {deGrandPrize && deGrandPrize.drawTime > 0 ? (
              <>
                <FlexLine
                  className="md:flex-column align-items-start"
                  style={{
                    marginTop: '-65px',
                  }}
                >
                  <Header
                    className="py-2 px-3 inline-flex border-neon-2 anim-float-4"
                    style={{
                      borderRadius: '8px',
                      background:
                        'linear-gradient(50deg, rgba(89,70,0,1) 0%, rgba(193,160,49,1) 48%, rgba(89,70,0,1) 100%)',
                    }}
                  >
                    <Icon
                      className="fad fa-gift pr-2"
                      size="20px"
                      style={{ paddingTop: '2px' }}
                    ></Icon>
                    <span
                      style={{ fontWeight: 900 }}
                    >{`${deGrandPrize.maxWinnerCount} `}</span>
                    &nbsp;Prizes This Month
                  </Header>
                </FlexLine>

                <div className="grid mt-4">
                  <div className="col-12 md:col-8 lg:col-8">
                    <Header className="mb-2" fontSize="24px">
                      {deGrandPrize.title}
                    </Header>
                    <Header fontSize="14px" className="opacity-60 pb-4">
                      {deGrandPrize.subtitle}
                    </Header>
                    <Text className="pb-2">{deGrandPrize.description}</Text>
                  </div>
                  <div className="col-12 md:col-4 lg:col-4">
                    <div className="card overview-box gray">
                      <div className="overview-info pr-4 text-left w-full">
                        {lotteryMonthAsInt === currentMonthAsInt &&
                        deGrandStatus === LotteryStatus.CLAIMABLE ? (
                          <Text className="text-pink-400">Draw Completed!</Text>
                        ) : deGrandPrize &&
                          deGrandPrize.drawTime > currentSeconds ? (
                          <>
                            <Header className="pb-2">Countdown</Header>
                            <EventCountDown
                              nextEventTime={deGrandPrize.drawTime}
                              postCountDownText="left until the draw"
                            />
                          </>
                        ) : (
                          <Title fontSize="14px">Waiting...</Title>
                        )}
                      </div>
                      <i className="fad fa-clock"></i>
                    </div>
                  </div>
                </div>

                <FlexLine className="md:flex-column align-items-center">
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
              </>
            ) : (
              <div className="text-center">
                <Icon className="fad fa-gift pb-4" size="30px"></Icon>
                <Text className="text-center" fontSize="20px">
                  Prizes will be announced soon!
                </Text>
                <Button
                  className="p-button-link p-0 mt-3"
                  label="Read more about the 'DeGrand'"
                />
              </div>
            )}
            <FlexLine className="md:flex-column align-items-center justify-content-between">
              {account ? (
                deGrandPrize &&
                deGrandPrize.drawTime > 0 && (
                  <>
                    <Header className="my-3">DeGrand history</Header>
                    <Text className="mb-3">See previous DeGrand Draws</Text>
                    <Button
                      className="mt-2 justify-content-center"
                      onClick={() => handleShowDialog('CheckDeGrandHistory')}
                      label="Check Now"
                    />
                  </>
                )
              ) : (
                <ConnectWalletButton />
              )}
            </FlexLine>
          </StyledBox>
        </Card>
      )}

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
