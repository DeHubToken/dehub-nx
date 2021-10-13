import { useState } from 'react';
import { addHours } from 'date-fns';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Hooks } from '@dehub/react/core';

import BuyStandardTicketDialog from './components/BuyStandardTicketDialog';
import BuySpecialTicketDialog from './components/BuySpecialTicketDialog';
import ClaimStage1Dialog from './components/ClaimStage1Dialog';
import ClaimStage2Dialog from './components/ClaimStage2Dialog';
import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import ListTicketDialog from './components/ListTicketDialog';
import PrizePot from './components/PrizePot';
import WinningNumbers from './components/WiningNumbers';
import Box from '../components/Layout/Box';
import ConnectWalletButton from '../components/ConnectWalletButton';
import Container from '../components/Layout/Container';
import { Header, Text } from '../components/Text';

import useStatusTransitions from '../hooks/useStatusTransitions';
import useGetNextLotteryEvent from '../hooks/useGetNextLotteryEvent';
import {
  useLottery,
  useFetchLottery,
  usePreviousLottery,
} from '../states/standard-lottery/hooks';
import { LotteryStatus } from '../config/constants/types';

const StyledContainer = styled(Container)`
  .p-tabview .p-tabview-nav li {
    width: 50%;
  }
`;

const StyledBox = styled(Box)`
  padding: 1rem;
`;

const winningNumbers: number[] = [5, 16, 9, 12];

const DeLotto = () => {
  useFetchLottery();
  useStatusTransitions();
  const {
    currentLotteryId,
    currentRound: {
      status,
      startTime,
      endTime,
      amountCollectedInDehub,
      userTickets,
    },
  } = useLottery();
  const currentLotteryIdAsInt = parseInt(currentLotteryId, 10);
  const startTimeAsInt = parseInt(startTime, 10);
  const endTimeAsInt = parseInt(endTime, 10);
  const { nextEventTime, countDownText } = useGetNextLotteryEvent(
    endTimeAsInt,
    status
  );

  const previousLotteryIdAsInt = currentLotteryIdAsInt - 1;
  const { previousLotteryId, previousRound } = usePreviousLottery(
    previousLotteryIdAsInt.toString()
  );
  const prevEndTimeAsInt = previousRound
    ? parseInt(previousRound.endTime, 10)
    : 0;

  const { account } = Hooks.useMoralisEthers();

  const [listTicketDialog, setListTicketDialog] = useState(false);
  const [buyStandardTicketDialog, setBuyStandardTicketDialog] = useState(false);
  const [buySpecialTicketDialog, setBuySpecialTicketDialog] = useState(false);
  const [checkStage1Dialog, setCheckStage1Dialog] = useState(false);
  const [checkStage2Dialog, setCheckStage2Dialog] = useState(false);

  const handleShowDialog = (dialogKind: string) => {
    if (dialogKind === 'ListTicket') {
      setListTicketDialog(true);
    } else if (dialogKind === 'BuyStandardTicket') {
      setBuyStandardTicketDialog(true);
    } else if (dialogKind === 'BuySpecialTicket') {
      setBuySpecialTicketDialog(true);
    } else if (dialogKind === 'CheckStage1') {
      setCheckStage1Dialog(true);
    } else if (dialogKind === 'CheckStage2') {
      setCheckStage1Dialog(true);
    }
  };
  const handleHideDialog = (dialogKind: string) => {
    if (dialogKind === 'ListTicket') {
      setListTicketDialog(false);
    } else if (dialogKind === 'BuyStandardTicket') {
      setBuyStandardTicketDialog(false);
    } else if (dialogKind === 'BuySpecialTicket') {
      setBuySpecialTicketDialog(false);
    } else if (dialogKind === 'CheckStage1') {
      setCheckStage1Dialog(false);
    } else if (dialogKind === 'CheckStage2') {
      setCheckStage1Dialog(false);
    }
  };

  const handleInputChange = (input: string) => {
    console.log('Balance input=', input);
  };

  const handleClaimStage2 = () => {
    console.log('Claim stage2');
  };

  return (
    <StyledContainer>
      <h1>DeLotto</h1>
      <TabView>
        <TabPanel header="STAGE #1">
          <StyledBox>
            <FlexLine className="align-items-center justify-content-center">
              {nextEventTime && countDownText ? (
                <EventCountDown
                  nextEventTime={nextEventTime}
                  countDownText={countDownText}
                />
              ) : (
                <h1 className="text-center">Loading...</h1>
              )}
            </FlexLine>

            <FlexLine className="align-items-center justify-content-between">
              <Header>Next Draw:</Header>
              {currentLotteryIdAsInt > 0 ? (
                <Text>
                  #{currentLotteryId} | Draw:{' '}
                  {addHours(startTimeAsInt * 1000, 6).toLocaleString()}
                </Text>
              ) : (
                <Text>...</Text>
              )}
            </FlexLine>

            <FlexLine className="align-items-center justify-content-between">
              <Header>Prize Pot:</Header>
              <PrizePot pot={amountCollectedInDehub} status={status} />
            </FlexLine>

            {account && (
              <FlexLine className="align-items-center md:align-items-start justify-content-between">
                <Header>Your Tickets:</Header>
                <div className="flex flex-column align-items-center md:align-items-end">
                  {userTickets && userTickets.isLoading ? (
                    <>
                      <Text>
                        You have{' '}
                        <span className="font-bold">
                          {userTickets.tickets?.length}
                        </span>{' '}
                        tickets this round.
                      </Text>
                      <Button
                        className="p-button-link p-0"
                        onClick={() => handleShowDialog('ListTicket')}
                      >
                        View your tickets
                      </Button>
                    </>
                  ) : (
                    <Text>...</Text>
                  )}
                  {account && status === LotteryStatus.OPEN && (
                    <Button
                      className="button-link mt-3"
                      onClick={() => handleShowDialog('BuyStandardTicket')}
                    >
                      Buy Tickets
                    </Button>
                  )}
                </div>
              </FlexLine>
            )}

            {previousRound && (
              <FlexLine className="align-items-center md:align-items-start justify-content-between">
                <Header>Latest Winning Number:</Header>
                <div className="flex flex-column align-items-center md:align-items-end">
                  <WinningNumbers numbers={winningNumbers} rounded={true} />
                  <Text>Round #{previousLotteryId}</Text>
                  <Text>
                    Drawn {new Date(prevEndTimeAsInt * 1000).toLocaleString()}
                  </Text>
                </div>
              </FlexLine>
            )}

            <FlexLine className="md:flex-column align-items-center justify-content-between">
              <Text>Are you a winner?</Text>
              {account ? (
                <Button
                  className="mt-2 justify-content-center"
                  onClick={() => handleShowDialog('CheckStage1')}
                >
                  Check Now
                </Button>
              ) : (
                <ConnectWalletButton />
              )}
            </FlexLine>
          </StyledBox>
        </TabPanel>

        <TabPanel header="STAGE #2">
          <StyledBox>
            <h1 className="text-center">1d 2h 26m until the draw</h1>

            <FlexLine className="align-items-center justify-content-between">
              <Header>Next Draw:</Header>
              <Text>#166 | Draw: Sep 23, 2021, 3:00 PM</Text>
            </FlexLine>

            <FlexLine className="align-items-center justify-content-between">
              <Header>Prize Pot:</Header>
              <Text>300,000,000 $DeHub</Text>
            </FlexLine>

            <FlexLine className="align-items-center md:align-items-start justify-content-between">
              <Header>Your Tickets:</Header>
              <div className="flex flex-column align-items-center md:align-items-end">
                <Text>
                  You have <span className="font-bold">10</span> tickets this
                  round.
                </Text>
                <Button
                  className="p-button-link p-0"
                  onClick={() => handleShowDialog('ListTicket')}
                >
                  View your tickets
                </Button>
                <Button
                  className="button-link mt-3"
                  onClick={() => handleShowDialog('BuySpecialTicket')}
                >
                  Buy Special Tickets
                </Button>
              </div>
            </FlexLine>

            <div className="flex flex-row justify-content-center">
              <div className="flex flex-column">
                <Text>Are you a winner?</Text>
                <Button
                  className="mt-2 justify-content-center"
                  onClick={() => handleShowDialog('CheckStage1')}
                >
                  Check Now
                </Button>
              </div>
              <div className="flex flex-column ml-3">
                <Text>Are you a winner stage2?</Text>
                <Button
                  className="mt-2 justify-content-center"
                  onClick={() => handleShowDialog('CheckStage2')}
                >
                  Check Now
                </Button>
              </div>
            </div>
          </StyledBox>
        </TabPanel>
      </TabView>

      <ListTicketDialog
        open={listTicketDialog}
        onHide={() => handleHideDialog('ListTicket')}
        onBuy={() => handleShowDialog('BuyStandardTicket')}
        roundId={currentLotteryId}
        tickets={
          userTickets && userTickets.isLoading ? userTickets.tickets : []
        }
        status={status}
      />

      <BuyStandardTicketDialog
        open={buyStandardTicketDialog}
        onHide={() => handleHideDialog('BuyStandardTicket')}
      />

      <BuySpecialTicketDialog
        open={buySpecialTicketDialog}
        onHide={() => handleHideDialog('BuyStandardTicket')}
        onUserInput={handleInputChange}
      />

      <ClaimStage1Dialog
        open={checkStage1Dialog}
        onHide={() => handleHideDialog('CheckStage1')}
        roundId={currentLotteryId}
      />

      <ClaimStage2Dialog
        open={checkStage2Dialog}
        onHide={() => handleHideDialog('CheckStage2')}
        onClaim={handleClaimStage2}
      />
    </StyledContainer>
  );
};

export default DeLotto;
