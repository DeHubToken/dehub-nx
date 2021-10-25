import { useState } from 'react';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

import { Hooks } from '@dehub/react/core';

import BuySpecialTicketDialog from './components/BuySpecialTicketDialog';
import ClaimStage1Dialog from './components/ClaimStage1Dialog';
import ClaimStage2Dialog from './components/ClaimStage2Dialog';
import { EventCountDown } from './components/CountDown';
import FlexLine from './components/FlexLine';
import ListTicketDialog from './components/ListTicketDialog';
import PrizePot from './components/PrizePot';

import { LotteryStatus } from '../config/constants/types';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { Title, Header, Text } from '../components/Text';
import useGetNextLotteryEvent from '../hooks/useGetNextLotteryEvent';
import { useLottery } from '../states/special-lottery/hooks';

const DeLottoStage2 = () => {
  const {
    currentLotteryId,
    isTransitioning,
    currentRound: {
      deLottoStatus,
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
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left w-full">
              <Header className="pb-2">{'Round #' + currentLotteryId}</Header>
              {nextEventTime && postCountDownText ? (
                <EventCountDown
                  nextEventTime={nextEventTime}
                  postCountDownText={postCountDownText}
                />
              ) : (
                <Skeleton width="100%" height="1.5rem" />
              )}
            </div>
            <i className="fad fa-clock"></i>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left w-full">
              <Header>Next Draw:</Header>
              {deLottoStatus !== LotteryStatus.PENDING &&
              nextLotteryIdAsInt > 0 ? (
                <>
                  <Text fontSize="22px">
                    {new Date(endTimeAsInt * 1000).toLocaleDateString()}
                  </Text>
                  <Text fontSize="14px">
                    {new Date(endTimeAsInt * 1000).toLocaleTimeString()}
                  </Text>
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="2.4rem" />
                  <Skeleton width="100%" height="1rem" className="mt-2" />
                </>
              )}
            </div>
            <i className="fad fa-calendar-star"></i>
          </div>
        </div>
      </div>

      <div className="grid mt-1 mb-4">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left w-full">
              <Header className="pb-2">Prize Pot</Header>
              <PrizePot
                pot={unwonPreviousPotInDehub.plus(amountCollectedInDehub)}
                status={deLottoStatus}
              />
            </div>
            <i className="fad fa-coins"></i>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray">
            <div className="overview-info pr-4 text-left w-full flex flex-column align-items-start">
              <Header className="pb-2">Your Tickets</Header>
              {deLottoStatus !== LotteryStatus.PENDING ? (
                <>
                  <Text>
                    You have{' '}
                    <span className="font-bold">
                      {account && userTickets && !userTickets.isLoading
                        ? userTickets.tickets?.length
                        : 0}
                    </span>{' '}
                    tickets this round.
                  </Text>
                  {account &&
                    userTickets &&
                    !userTickets.isLoading &&
                    userTickets.tickets &&
                    userTickets.tickets?.length > 0 && (
                      <Button
                        className="p-button-link p-0"
                        onClick={() => handleShowDialog('ListTicket')}
                        label="View your tickets"
                      />
                    )}
                  {account &&
                    deLottoStatus === LotteryStatus.OPEN &&
                    !isTransitioning && (
                      <Button
                        className="button-link mt-3"
                        onClick={() => handleShowDialog('BuySpecialTicket')}
                        label="Buy Tickets"
                      />
                    )}
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="1.5rem" />
                  <Skeleton width="8rem" height="1.5rem" className="mt-2" />
                </>
              )}
            </div>
            <i className="fad fa-ticket"></i>
          </div>
        </div>
      </div>

      {deLottoStatus !== LotteryStatus.PENDING && (
        <div className="flex flex-row justify-content-center">
          {account ? (
            <>
              <div className="flex flex-column">
                <Text className="mb-3">Are you a winner stage1?</Text>
                <Button
                  className="mt-2 justify-content-center"
                  onClick={() => handleShowDialog('CheckStage1')}
                  label="Check Now"
                />
              </div>
              {deLottoStatus === LotteryStatus.CLAIMABLE && (
                <div className="flex flex-column ml-3">
                  <Text className="mb-3">Are you a winner stage2?</Text>
                  <Button
                    className="mt-2 justify-content-center"
                    onClick={() => handleShowDialog('CheckStage2')}
                    label="Check Now"
                  />
                </div>
              )}
            </>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      )}

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
