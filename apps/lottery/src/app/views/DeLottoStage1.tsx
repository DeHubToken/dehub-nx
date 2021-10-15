import { useState } from 'react';
import { Button } from 'primereact/button';

import { Hooks } from '@dehub/react/core';

import BuyStandardTicketDialog from './components/BuyStandardTicketDialog';
import ClaimStage1Dialog from './components/ClaimStage1Dialog';
import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import ListTicketDialog from './components/ListTicketDialog';
import PrizePot from './components/PrizePot';
import WinningNumbers from './components/WiningNumbers';

import { LotteryStatus } from '../config/constants/types';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { Header, Text } from '../components/Text';
import useGetNextLotteryEvent from '../hooks/useGetNextLotteryEvent';
import {
  useLottery,
  usePreviousLottery,
} from '../states/standard-lottery/hooks';

const DeLottoStage1 = () => {
  const {
    currentLotteryId,
    isTransitioning,
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
  const { nextEventTime, preCountDownText, postCountDownText } =
    useGetNextLotteryEvent(endTimeAsInt, currentLotteryId, status);

  const nextLotteryIdAsInt =
    status === LotteryStatus.OPEN
      ? currentLotteryIdAsInt
      : currentLotteryIdAsInt + 1;

  const previousLotteryIdAsInt =
    status === LotteryStatus.CLAIMABLE
      ? currentLotteryIdAsInt
      : currentLotteryIdAsInt - 1;
  const { previousLotteryId, previousRound } = usePreviousLottery(
    previousLotteryIdAsInt.toString()
  );
  const prevEndTimeAsInt = previousRound
    ? parseInt(previousRound.endTime, 10)
    : 0;

  const { account } = Hooks.useMoralisEthers();

  const [listTicketDialog, setListTicketDialog] = useState(false);
  const [buyStandardTicketDialog, setBuyStandardTicketDialog] = useState(false);
  const [checkStage1Dialog, setCheckStage1Dialog] = useState(false);

  const handleShowDialog = (dialogKind: string) => {
    if (dialogKind === 'ListTicket') {
      setListTicketDialog(true);
    } else if (dialogKind === 'BuyStandardTicket') {
      setBuyStandardTicketDialog(true);
    } else if (dialogKind === 'CheckStage1') {
      setCheckStage1Dialog(true);
    }
  };
  const handleHideDialog = (dialogKind: string) => {
    if (dialogKind === 'ListTicket') {
      setListTicketDialog(false);
    } else if (dialogKind === 'BuyStandardTicket') {
      setBuyStandardTicketDialog(false);
    } else if (dialogKind === 'CheckStage1') {
      setCheckStage1Dialog(false);
    }
  };

  return (
    <>
      <FlexLine className="align-items-center justify-content-center">
        {nextEventTime && (preCountDownText || postCountDownText) ? (
          <EventCountDown
            nextEventTime={nextEventTime}
            preCountDownText={preCountDownText}
            postCountDownText={postCountDownText}
          />
        ) : (
          <h1 className="text-center" style={{ fontSize: '30px' }}>
            Loading...
          </h1>
        )}
      </FlexLine>

      <FlexLine className="align-items-center justify-content-between">
        <Header>Next Draw:</Header>
        {nextLotteryIdAsInt > 0 ? (
          <Text>
            #{nextLotteryIdAsInt} | Draw:{' '}
            {new Date(endTimeAsInt * 1000).toLocaleString()}
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
            {userTickets && !userTickets.isLoading ? (
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
            {account && status === LotteryStatus.OPEN && !isTransitioning && (
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
            <WinningNumbers number={previousRound.finalNumber} rounded={true} />
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

      <ListTicketDialog
        open={listTicketDialog}
        onHide={() => handleHideDialog('ListTicket')}
        onBuy={() => handleShowDialog('BuyStandardTicket')}
        roundId={currentLotteryId}
        tickets={
          userTickets && !userTickets.isLoading ? userTickets.tickets : []
        }
        status={status}
      />

      <BuyStandardTicketDialog
        open={buyStandardTicketDialog}
        onHide={() => handleHideDialog('BuyStandardTicket')}
      />

      <ClaimStage1Dialog
        open={checkStage1Dialog}
        onHide={() => handleHideDialog('CheckStage1')}
      />
    </>
  );
};

export default DeLottoStage1;
