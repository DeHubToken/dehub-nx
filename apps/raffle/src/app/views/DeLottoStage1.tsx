import { ConnectWalletButton } from '@dehub/react/core';
import { Heading, Text } from '@dehub/react/ui';
import { format } from 'date-fns';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { useMemo, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { LotteryStatus } from '../config/constants/types';
import useGetNextLotteryEvent from '../hooks/useGetNextLotteryEvent';
import {
  useLottery,
  usePreviousLottery,
} from '../states/standard-raffle/hooks';
import BuyStandardTicketDialog from './components/BuyStandardTicketDialog';
import ClaimStage1Dialog from './components/ClaimStage1Dialog';
import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import ListTicketDialog from './components/ListTicketDialog';
import PrizePot from './components/PrizePot';
import WinningNumbers from './components/WiningNumbers';

const DeLottoStage1 = () => {
  const {
    currentLotteryId,
    isTransitioning,
    currentRound: {
      status,
      endTime,
      unwonPreviousPotInDehub,
      amountCollectedInDehub,
      userTickets,
    },
  } = useLottery();
  const currentLotteryIdAsInt = parseInt(currentLotteryId, 10);
  const endTimeAsInt = parseInt(endTime, 10);
  const { nextEventTime, postCountDownText } = useGetNextLotteryEvent(
    endTimeAsInt,
    currentLotteryId,
    status
  );

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

  const { account } = useMoralis();

  const [listTicketDialog, setListTicketDialog] = useState(false);
  const [buyStandardTicketDialog, setBuyStandardTicketDialog] = useState(false);
  const [checkStage1Dialog, setCheckStage1Dialog] = useState(false);
  const prize = useMemo(
    () => unwonPreviousPotInDehub.plus(amountCollectedInDehub),
    [unwonPreviousPotInDehub, amountCollectedInDehub]
  );

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
      <div className="grid">
        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Heading className="pb-2">Current Draw</Heading>
              {status !== LotteryStatus.PENDING &&
              status !== LotteryStatus.BURNED &&
              nextEventTime &&
              postCountDownText ? (
                <EventCountDown
                  nextEventTime={nextEventTime}
                  postCountDownText={postCountDownText}
                />
              ) : (
                <Skeleton width="100%" height="2.4rem" />
              )}
            </div>
            <i className="fad fa-clock"></i>
          </div>
        </div>

        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Heading className="pb-2">Next Draw</Heading>
              {status !== LotteryStatus.PENDING &&
              status !== LotteryStatus.BURNED ? (
                <>
                  <Text fontSize="22px">
                    {format(endTimeAsInt * 1000, 'HH:mm:ss')}
                  </Text>
                  <Text fontSize="14px">
                    {format(endTimeAsInt * 1000, 'dd/MM/yyyy')}
                  </Text>
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="2.4rem" />
                  <Skeleton width="100%" height="1.5rem" className="mt-2" />
                </>
              )}
            </div>
            <i className="fad fa-calendar-star"></i>
          </div>
        </div>

        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Heading className="pb-2">Prize Pot</Heading>
              <PrizePot pot={prize} status={status} />
            </div>
            <i className="fad fa-coins"></i>
          </div>
        </div>
      </div>

      <div className="grid mt-1 mb-4">
        <div className="col-12 md:col-5 lg:col-5">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full flex flex-column align-items-start">
              <Heading className="pb-2">Your Tickets</Heading>
              {status !== LotteryStatus.PENDING &&
              status !== LotteryStatus.BURNED ? (
                account && userTickets && !userTickets.isLoading ? (
                  <>
                    <Text>
                      You have{' '}
                      <Text fontSize="22px" className="inline">
                        {userTickets && !userTickets.isLoading
                          ? userTickets.tickets?.length
                          : 0}
                      </Text>{' '}
                      {userTickets &&
                      userTickets.tickets &&
                      userTickets.tickets?.length === 1
                        ? 'ticket'
                        : 'tickets'}{' '}
                      this round.
                    </Text>
                    {userTickets &&
                      !userTickets.isLoading &&
                      userTickets.tickets &&
                      userTickets.tickets?.length > 0 && (
                        <Button
                          className="p-button-link p-0"
                          onClick={() => handleShowDialog('ListTicket')}
                          label="View your tickets"
                        />
                      )}
                    {status === LotteryStatus.OPEN && !isTransitioning && (
                      <Button
                        className="button-link mt-3"
                        onClick={() => handleShowDialog('BuyStandardTicket')}
                        label="Buy Tickets"
                        icon="fal fa-coin"
                      />
                    )}
                  </>
                ) : account ? (
                  <>
                    <Skeleton width="100%" height="2.4rem" />
                    <Skeleton width="8rem" height="1.5rem" className="mt-2" />
                  </>
                ) : (
                  <>
                    <Text className="mb-2">
                      Please connect your wallet first.
                    </Text>
                    <ConnectWalletButton />
                  </>
                )
              ) : (
                <>
                  <Skeleton width="100%" height="2.4rem" />
                  <Skeleton width="8rem" height="1.5rem" className="mt-2" />
                </>
              )}
            </div>
            <i className="fad fa-ticket"></i>
          </div>
        </div>

        <div className="col-12 md:col-7 lg:col-7">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Heading className="pb-2">Last Winning Numbers</Heading>
              {status !== LotteryStatus.PENDING &&
              status !== LotteryStatus.BURNED &&
              previousRound ? (
                <>
                  <Text className="mb-2">Round #{previousLotteryId}</Text>
                  <Text className="mb-4">
                    Drawn {new Date(prevEndTimeAsInt * 1000).toLocaleString()}
                  </Text>
                  <WinningNumbers
                    number={previousRound.finalNumber}
                    rounded={true}
                  />
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="1.5rem" className="mb-2" />
                  <Skeleton width="100%" height="1.5rem" className="mb-4" />
                  <Skeleton width="100%" height="3rem" />
                </>
              )}
            </div>
            <i className="fad fa-star"></i>
          </div>
        </div>
      </div>

      {status !== LotteryStatus.PENDING && (
        <FlexLine className="md:flex-column align-items-center justify-content-between">
          {account && (
            <>
              <Text className="mb-3">Are you a winner?</Text>
              <Button
                className="justify-content-center"
                onClick={() => handleShowDialog('CheckStage1')}
                label="Check Now"
              />
            </>
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
