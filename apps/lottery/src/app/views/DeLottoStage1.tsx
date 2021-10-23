import { useState } from 'react';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

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
import { Title, Header, Text } from '../components/Text';
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
      unwonPreviousPotInDehub,
      amountCollectedInDehub,
      userTickets,
    },
  } = useLottery();
  const currentLotteryIdAsInt = parseInt(currentLotteryId, 10);
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
            headerText={'Round #' + currentLotteryId}
            headerFontSize="14px"
            preCountDownText={preCountDownText}
            postCountDownText={postCountDownText}
          />
        ) : (
          <div className={`flex flex-row`}>
            <div className="card overview-box gray">
              <div className="overview-info px-4 text-left">
                <Title>Loading...</Title>
              </div>
            </div>
          </div>
        )}
      </FlexLine>

      <FlexLine className="align-items-center justify-content-between">
        {status !== LotteryStatus.PENDING && nextLotteryIdAsInt > 0 ? (
          <>
            <Header>Next Draw:</Header>
            <Text>
              #{nextLotteryIdAsInt} | Draw:{' '}
              {new Date(endTimeAsInt * 1000).toLocaleString()}
            </Text>
          </>
        ) : (
          <>
            <Skeleton width="7rem" height="2rem" />
            <Skeleton width="20rem" height="1.5rem" />
          </>
        )}
      </FlexLine>

      <FlexLine className="align-items-center justify-content-between">
        {status !== LotteryStatus.PENDING ? (
          <Header>Prize Pot:</Header>
        ) : (
          <Skeleton width="6rem" height="2rem" />
        )}
        <PrizePot
          pot={unwonPreviousPotInDehub.plus(amountCollectedInDehub)}
          status={status}
        />
      </FlexLine>

      {account && (
        <FlexLine className="align-items-center md:align-items-start justify-content-between">
          {status !== LotteryStatus.PENDING ? (
            <Header>Your Tickets:</Header>
          ) : (
            <Skeleton width="8rem" height="2rem" />
          )}
          <div className="flex flex-column align-items-center md:align-items-end">
            {status !== LotteryStatus.PENDING &&
            userTickets &&
            !userTickets.isLoading ? (
              <>
                <Text>
                  You have{' '}
                  <span className="font-bold">
                    {userTickets.tickets?.length}
                  </span>{' '}
                  tickets this round.
                </Text>
                {userTickets.tickets && userTickets.tickets?.length > 0 && (
                  <Button
                    className="p-button-link p-0"
                    onClick={() => handleShowDialog('ListTicket')}
                    label="View your tickets"
                  />
                )}
              </>
            ) : (
              <>
                <Skeleton width="16rem" height="1.5rem" />
                <Skeleton width="8rem" height="1.5rem" className="mt-2" />
              </>
            )}
            {account && status === LotteryStatus.OPEN && !isTransitioning && (
              <Button
                className="button-link mt-3"
                onClick={() => handleShowDialog('BuyStandardTicket')}
                label="Buy Tickets"
              />
            )}
          </div>
        </FlexLine>
      )}

      {previousLotteryIdAsInt > 0 && (
        <FlexLine className="align-items-center md:align-items-start justify-content-between">
          {status !== LotteryStatus.PENDING ? (
            <Header>Latest Winning Number:</Header>
          ) : (
            <Skeleton width="16rem" height="2rem" />
          )}

          <div className="flex flex-column align-items-center md:align-items-end">
            {status !== LotteryStatus.PENDING && previousRound ? (
              <>
                <WinningNumbers
                  number={previousRound.finalNumber}
                  rounded={true}
                />
                <Text className="mt-2">Round #{previousLotteryId}</Text>
                <Text className="mt-2">
                  Drawn {new Date(prevEndTimeAsInt * 1000).toLocaleString()}
                </Text>
              </>
            ) : (
              <>
                <Skeleton width="16rem" height="2.5rem" />
                <Skeleton width="6rem" height="1.5rem" className="mt-2" />
                <Skeleton width="14rem" height="2rem" className="mt-2" />
              </>
            )}
          </div>
        </FlexLine>
      )}

      {status !== LotteryStatus.PENDING && (
        <FlexLine className="md:flex-column align-items-center justify-content-between">
          <Text className="mb-3">Are you a winner?</Text>
          {account ? (
            <Button
              className="justify-content-center"
              onClick={() => handleShowDialog('CheckStage1')}
              label="Check Now"
            />
          ) : (
            <ConnectWalletButton />
          )}
        </FlexLine>
      )}

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
