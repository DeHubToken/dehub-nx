import { useMemo, useState } from 'react';
import { format, addMonths } from 'date-fns';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

import { Hooks } from '@dehub/react/core';

import BuySpecialTicketDialog from './components/BuySpecialTicketDialog';
import ClaimStage1Dialog from './components/ClaimStage1Dialog';
import ClaimStage2Dialog from './components/ClaimStage2Dialog';
import { EventCountDown } from './components/CountDown';
import ListTicketDialog from './components/ListTicketDialog';
import PrizePot from './components/PrizePot';

import { LotteryStatus } from '../config/constants/types';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { Header, Text } from '../components/Text';
import useGetNextLotteryEvent from '../hooks/useGetNextLotteryEvent';
import { useLottery } from '../states/special-lottery/hooks';
import { localToUTC } from '../utils/dateHelpers';
import { Icon } from '../components/Icon';

const DeLottoStage2 = () => {
  const {
    currentLotteryId,
    isTransitioning,
    currentRound: {
      deLottoStatus,
      startTime,
      endTime,
      unwonPreviousPotInDehub,
      amountCollectedInDehub,
      userTickets,
    },
  } = useLottery();
  const currentLotteryIdAsInt = parseInt(currentLotteryId, 10);
  const endTimeAsInt = parseInt(endTime, 10);
  const nextDrawAsInt = addMonths(parseInt(startTime, 10) * 1000, 1).getTime();
  const { nextEventTime, postCountDownText } = useGetNextLotteryEvent(
    endTimeAsInt,
    currentLotteryId,
    deLottoStatus
  );

  const nextLotteryIdAsInt =
    deLottoStatus === LotteryStatus.OPEN
      ? currentLotteryIdAsInt
      : currentLotteryIdAsInt + 1;

  const { account } = Hooks.useMoralisEthers();

  const [listTicketDialog, setListTicketDialog] = useState(false);
  const [buySpecialTicketDialog, setBuySpecialTicketDialog] = useState(false);
  const [checkStage1Dialog, setCheckStage1Dialog] = useState(false);
  const [checkStage2Dialog, setCheckStage2Dialog] = useState(false);
  const prize = useMemo(
    () => unwonPreviousPotInDehub.plus(amountCollectedInDehub),
    [unwonPreviousPotInDehub, amountCollectedInDehub]
  );

  const handleShowDialog = (dialogKind: string) => {
    if (dialogKind === 'ListTicket') {
      setListTicketDialog(true);
    } else if (dialogKind === 'BuySpecialTicket') {
      setBuySpecialTicketDialog(true);
    } else if (dialogKind === 'CheckStage1') {
      setCheckStage1Dialog(true);
    } else if (dialogKind === 'CheckStage2') {
      setCheckStage2Dialog(true);
    }
  };
  const handleHideDialog = (dialogKind: string) => {
    if (dialogKind === 'ListTicket') {
      setListTicketDialog(false);
    } else if (dialogKind === 'BuySpecialTicket') {
      setBuySpecialTicketDialog(false);
    } else if (dialogKind === 'CheckStage1') {
      setCheckStage1Dialog(false);
    } else if (dialogKind === 'CheckStage2') {
      setCheckStage2Dialog(false);
    }
  };

  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Current Draw</Header>
              {deLottoStatus !== LotteryStatus.PENDING &&
              nextEventTime &&
              postCountDownText ? (
                <EventCountDown
                  nextEventTime={nextEventTime}
                  postCountDownText={postCountDownText}
                  waiting="Draw completed!"
                />
              ) : (
                <Skeleton width="100%" height="2.4rem" />
              )}
            </div>
            <Icon className="fad fa-clock"></Icon>
          </div>
        </div>

        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header>Next Draw:</Header>
              {deLottoStatus !== LotteryStatus.PENDING &&
              nextLotteryIdAsInt > 0 ? (
                <>
                  <Text fontSize="22px">
                    {format(nextDrawAsInt, 'HH:mm:ss')}
                  </Text>
                  <Text fontSize="14px">
                    {format(nextDrawAsInt, 'dd/MM/yyyy')}
                  </Text>
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="2.4rem" />
                  <Skeleton width="100%" height="1.5rem" className="mt-2" />
                </>
              )}
            </div>
            <Icon className="fad fa-calendar-star"></Icon>
          </div>
        </div>

        <div className="col-12 md:col-4 lg:col-4">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Prize Pot</Header>
              <PrizePot pot={prize} status={deLottoStatus} />
            </div>
            <Icon className="fad fa-coins"></Icon>
          </div>
        </div>
      </div>

      <div className="grid mt-1 mb-4">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full flex flex-column align-items-start">
              <Header className="pb-2">Your Tickets</Header>
              {deLottoStatus !== LotteryStatus.PENDING ? (
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
                        ? 'ticket.'
                        : 'tickets.'}{' '}
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
                    {deLottoStatus === LotteryStatus.OPEN &&
                      !isTransitioning && (
                        <Button
                          className="button-link mt-3"
                          onClick={() => handleShowDialog('BuySpecialTicket')}
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
                    <Text className="mb-3">
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
            <Icon className="fad fa-ticket"></Icon>
          </div>
        </div>

        {deLottoStatus !== LotteryStatus.PENDING && account && (
          <div className="col-12 md:col-6 lg:col-6">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Header className="pb-2">History</Header>
                <Text className="mb-3">Check and claim previous draws.</Text>
                {account ? (
                  <>
                    <Button
                      className="mt-2 justify-content-center mr-3"
                      onClick={() => handleShowDialog('CheckStage1')}
                      label="Stage One"
                    />
                    <Button
                      className="mt-2 justify-content-center"
                      onClick={() => handleShowDialog('CheckStage2')}
                      label="Stage Two"
                      disabled={!(deLottoStatus === LotteryStatus.CLAIMABLE)}
                    />
                  </>
                ) : (
                  <ConnectWalletButton />
                )}
              </div>
              <Icon className="fad fa-history"></Icon>
            </div>
          </div>
        )}
      </div>

      <ListTicketDialog
        open={listTicketDialog}
        onHide={() => handleHideDialog('ListTicket')}
        onBuy={() => handleShowDialog('BuySpecialTicket')}
        roundId={currentLotteryId}
        tickets={
          userTickets && !userTickets.isLoading ? userTickets.tickets : []
        }
        status={deLottoStatus}
      />

      <BuySpecialTicketDialog
        open={buySpecialTicketDialog}
        onHide={() => handleHideDialog('BuySpecialTicket')}
      />

      <ClaimStage1Dialog
        open={checkStage1Dialog}
        onHide={() => handleHideDialog('CheckStage1')}
      />

      <ClaimStage2Dialog
        open={checkStage2Dialog}
        onHide={() => handleHideDialog('CheckStage2')}
      />
    </>
  );
};

export default DeLottoStage2;
