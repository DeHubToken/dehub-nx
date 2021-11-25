import { Hooks } from '@dehub/react/core';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useState } from 'react';
import styled from 'styled-components';
import { environment } from '../../environments/environment';
import ConnectWalletButton from '../components/ConnectWalletButton';
import Icon from '../components/Icon/Icon';
import Box from '../components/Layout/Box';
import Container from '../components/Layout/Container';
import { Header, Text, Title } from '../components/Text';
import { LoadingStatus, LotteryStatus } from '../config/constants/types';
import { useGetSpecialPaused } from '../states/pause/hooks';
import {
  useLottery,
  useThisMonthDeGrandPrize,
} from '../states/special-raffle/hooks';
import ClaimDeGrandDialog from './components/ClaimDeGrandDialog';
import { EventCountDown } from './components/CountDown';
import DeGrandHistoryDialog from './components/DeGrandHistoryDialog';
import FlexLine from './components/FlexLine';
import SyncWaiting from './SyncWaiting';

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

  const path = environment.baseUrl;

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
      <FlexLine className="md:flex-column align-items-start justify-content-between">
        <img
          src={`${path}/assets/img/degrand-logo.png`}
          className="anim-float-1"
          alt="DeGrand Logo"
          style={{ maxWidth: '300px' }}
        />
      </FlexLine>
      {loadingStatus !== LoadingStatus.COMPLETE ? (
        <SyncWaiting loadingStatus={loadingStatus} />
      ) : (
        <Card
          className="border-neon-2 overflow-hidden"
          style={{ marginTop: '-80px' }}
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
                    className="py-2 px-3 inline-flex border-neon-2"
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
                    <span style={{ fontWeight: 900 }}>
                      {deGrandPrize.maxWinnerCount}
                    </span>
                    &nbsp;Lucky Winner
                    {deGrandPrize.maxWinnerCount > 1 ? `s` : ``}
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
                  <div className="col-12 md:col-4 lg:col-4 align-self-start">
                    <div className="card overview-box gray shadow-2">
                      <div className="overview-info text-left w-full">
                        <Header className="pb-2">DeGrand Draw</Header>
                        {lotteryMonthAsInt === currentMonthAsInt &&
                        deGrandStatus === LotteryStatus.CLAIMABLE ? (
                          <>
                            <Text
                              fontSize="14px"
                              color="orange"
                              fontWeight={900}
                              className="pb-2"
                            >
                              Completed!
                            </Text>
                            {account ? (
                              <>
                                <Text>Are you a winner?</Text>
                                <Button
                                  className="mt-2 justify-content-center md:w-full"
                                  onClick={() =>
                                    handleShowDialog('CheckDeGrand')
                                  }
                                  label="Check Now"
                                />
                              </>
                            ) : (
                              <ConnectWalletButton />
                            )}
                          </>
                        ) : deGrandPrize &&
                          deGrandPrize.drawTime > currentSeconds ? (
                          <EventCountDown
                            nextEventTime={deGrandPrize.drawTime}
                            postCountDownText="left until the draw"
                          />
                        ) : (
                          <Title fontSize="14px">Waiting...</Title>
                        )}
                      </div>
                      <Icon className="fad fa-clock"></Icon>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center my-6">
                <Icon className="fad fa-gift pb-4" size="30px"></Icon>
                <Text className="text-center" fontSize="20px">
                  Prizes will be announced soon!
                </Text>
                <Button
                  className="p-button-link p-0 mt-3"
                  label="Read more about 'DeGrand'"
                  onClick={() => {
                    window.open(
                      'https://www.dehub.net/uploads/DeHub%20Prize%20Draw%20Whitepaper%20-%20V1.pdf',
                      '_blank'
                    );
                  }}
                />
              </div>
            )}

            <div className="grid mt-4 justify-content-end">
              <div className="col-12 md:col-5 lg:colo-5">
                <div className="card overview-box gray shadow-2">
                  <div className="overview-info text-left w-full">
                    <Header className="pb-2">History</Header>
                    <Text className="mb-3">Check previous DeGrand draws.</Text>
                    {account ? (
                      <Button
                        className="mt-2 justify-content-center"
                        onClick={() => handleShowDialog('CheckDeGrandHistory')}
                        label="Check Now"
                      />
                    ) : (
                      <ConnectWalletButton />
                    )}
                  </div>
                  <Icon className="fad fa-history"></Icon>
                </div>
              </div>
            </div>
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
