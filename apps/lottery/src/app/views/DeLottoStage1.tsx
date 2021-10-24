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
  const { nextEventTime, postCountDownText } = useGetNextLotteryEvent(
    endTimeAsInt,
    currentLotteryId,
    status
  );

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
      <div className="grid">
        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left">
              <Header className="pb-2">{'Round #' + currentLotteryId}</Header>
              {nextEventTime && postCountDownText ? (
                <EventCountDown
                  nextEventTime={nextEventTime}
                  postCountDownText={postCountDownText}
                />
              ) : (
                <Title style={{ fontSize: '14px' }}>Loading...</Title>
              )}
            </div>
            <i className="fad fa-clock"></i>
          </div>
        </div>

        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left">
              {status !== LotteryStatus.PENDING && nextLotteryIdAsInt > 0 ? (
                <>
                  <Header className="pb-2">Next Draw</Header>
                  <Text>{new Date(endTimeAsInt * 1000).toLocaleString()}</Text>
                </>
              ) : (
                <>
                  <Skeleton width="7rem" height="2rem" />
                  <Skeleton width="20rem" height="1.5rem" />
                </>
              )}
            </div>
            <i className="fad fa-calendar-star"></i>
          </div>
        </div>

        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left">
              {status !== LotteryStatus.PENDING ? (
                <Header className="pb-2">Prize Pot</Header>
              ) : (
                <Skeleton width="6rem" height="2rem" />
              )}
              <PrizePot
                pot={unwonPreviousPotInDehub.plus(amountCollectedInDehub)}
                status={status}
              />
            </div>
            <i className="fad fa-coins"></i>
          </div>
        </div>
      </div>

      <div className="grid mt-1 mb-4">
        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left">
              {account && (
                <>
                  {status !== LotteryStatus.PENDING ? (
                    <Header className="pb-2">Your Tickets</Header>
                  ) : (
                    <Skeleton width="8rem" height="2rem" />
                  )}
                  <div>
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
                        {userTickets.tickets &&
                          userTickets.tickets?.length > 0 && (
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
                        <Skeleton
                          width="8rem"
                          height="1.5rem"
                          className="mt-2"
                        />
                      </>
                    )}
                    {account &&
                      status === LotteryStatus.OPEN &&
                      !isTransitioning && (
                        <Button
                          className="button-link mt-3"
                          onClick={() => handleShowDialog('BuyStandardTicket')}
                          label="Buy Tickets"
                        />
                      )}
                  </div>
                </>
              )}
            </div>
            <i className="fad fa-ticket"></i>
          </div>
        </div>

        <div className="col-12 md:col-8 lg:col-8">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left">
              {previousLotteryIdAsInt > 0 && (
                <>
                  {status !== LotteryStatus.PENDING ? (
                    <Header className="pb-2">Last Winning Numbers</Header>
                  ) : (
                    <Skeleton width="16rem" height="2rem" />
                  )}

                  <div>
                    {status !== LotteryStatus.PENDING && previousRound ? (
                      <>
                        <Text className="mb-2">Round #{previousLotteryId}</Text>
                        <Text className="mb-4">
                          Drawn{' '}
                          {new Date(prevEndTimeAsInt * 1000).toLocaleString()}
                        </Text>
                        <WinningNumbers
                          number={previousRound.finalNumber}
                          rounded={true}
                        />
                      </>
                    ) : (
                      <>
                        <Skeleton
                          width="6rem"
                          height="1.5rem"
                          className="mb-2"
                        />
                        <Skeleton
                          width="14rem"
                          height="2rem"
                          className="mb-4"
                        />
                        <Skeleton width="16rem" height="2.5rem" />
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            <i className="fad fa-star"></i>
          </div>
        </div>
      </div>

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
