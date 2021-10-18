import { useState } from 'react';

import { Button } from 'primereact/button';

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
    currentRound: { status, endTime, amountCollectedInDehub, userTickets },
  } = useLottery();
  const currentLotteryIdAsInt = parseInt(currentLotteryId, 10);
  const endTimeAsInt = parseInt(endTime, 10);
  const { nextEventTime, preCountDownText, postCountDownText } =
    useGetNextLotteryEvent(endTimeAsInt, currentLotteryId, status);

  const nextLotteryIdAsInt =
    status === LotteryStatus.OPEN
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
      <FlexLine className="align-items-center justify-content-center">
        {nextEventTime && (preCountDownText || postCountDownText) ? (
          <EventCountDown
            nextEventTime={nextEventTime}
            preCountDownText={preCountDownText}
            postCountDownText={postCountDownText}
          />
        ) : (
          <Title>Loading...</Title>
        )}
      </FlexLine>

      <FlexLine className="align-items-center justify-content-between">
        <Header>Next Draw:</Header>
        {status !== LotteryStatus.PENDING && nextLotteryIdAsInt > 0 ? (
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

      {status !== LotteryStatus.PENDING && account && (
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
                  label="View your tickets"
                />
              </>
            ) : (
              <Text>...</Text>
            )}
            {account && status === LotteryStatus.OPEN && !isTransitioning && (
              <Button
                className="button-link mt-3"
                onClick={() => handleShowDialog('BuySpecialTicket')}
                label="Buy Tickets"
              />
            )}
          </div>
        </FlexLine>
      )}

      {status !== LotteryStatus.PENDING && (
        <div className="flex flex-row justify-content-center">
          <div className="flex flex-column">
            <Text>Are you a winner stage1?</Text>
            {account ? (
              <Button
                className="mt-2 justify-content-center"
                onClick={() => handleShowDialog('CheckStage1')}
                label="Check Now"
              />
            ) : (
              <ConnectWalletButton />
            )}
          </div>
          {status === LotteryStatus.CLAIMABLE && (
            <div className="flex flex-column ml-3">
              <Text>Are you a winner stage2?</Text>
              {account ? (
                <Button
                  className="mt-2 justify-content-center"
                  onClick={() => handleShowDialog('CheckStage2')}
                  label="Check Now"
                />
              ) : (
                <ConnectWalletButton />
              )}
            </div>
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
        status={status}
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
