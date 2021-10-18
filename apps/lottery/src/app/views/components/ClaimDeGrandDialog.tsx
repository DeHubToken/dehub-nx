import { useEffect, useRef, useState } from 'react';
import { endOfMonth } from 'date-fns';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';

import { Hooks } from '@dehub/react/core';
import { DEHUB_DECIMALS } from '@dehub/shared/config';
import { BIG_ZERO, getBalanceNumber } from '@dehub/shared/utils';

import { SimpleCountDown } from './CountDown';

import { Header, Text } from '../../components/Text';
import { TicketIdLabel } from '../../components/TicketLabel';
import {
  LotteryTicket,
  LotteryTicketOwner,
} from '../../config/constants/types';
import useGetDeGrandWinners, {
  FetchStatus,
} from '../../hooks/special-lottery/useGetDeGrandWinners';
import { useSpecialLotteryContract } from '../../hooks/useContract';
import {
  useLottery,
  useThisMonthDeGrandPrize,
} from '../../states/special-lottery/hooks';

interface ClaimDeGrandDialogProps {
  open: boolean;
  onHide: () => void;
}

const ClaimDeGrandDialog = ({ open, onHide }: ClaimDeGrandDialogProps) => {
  const { currentLotteryId } = useLottery();

  const endOfMonthAsInt = endOfMonth(new Date()).getTime(); // end of month with 23:59:59
  const { fetchAllWinners, winners, fetchStatus } = useGetDeGrandWinners();
  const isFetchingWinners =
    fetchStatus === FetchStatus.NOT_FETCHED ||
    fetchStatus === FetchStatus.IN_PROGRESS;
  const { account } = Hooks.useMoralisEthers();
  const lotteryContract = useSpecialLotteryContract();
  const deGrandPrize = useThisMonthDeGrandPrize();
  const [myWinningTickets, setMyWinningTickets] = useState<
    LotteryTicketOwner[]
  >([]);

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (account && currentLotteryId) {
      fetchAllWinners();
    }
  }, [account, currentLotteryId, fetchAllWinners]);

  useEffect(() => {
    const filteredWinners = winners.filter(
      (item: LotteryTicketOwner) => item.owner === account
    );
    setMyWinningTickets(filteredWinners);
  }, [winners, account]);

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="p-fluid"
        header={`Round #${currentLotteryId}`}
        style={{ width: '250px' }}
        onHide={onHide}
      >
        <div className="flex flex-column">
          <div className="mb-2 flex justify-content-center">
            <Header>{`${deGrandPrize.title} Winners`}</Header>
          </div>
          <div className="mb-3 flex flex-column">
            {!isFetchingWinners && myWinningTickets.length > 0 && (
              <>
                <Text className="font-bold text-center text-green-600 mb-3">
                  {`You won ${myWinningTickets.length}!`}
                </Text>
                <div className="mb-4">
                  {myWinningTickets.map(
                    (winningTicket: LotteryTicketOwner, index: number) => {
                      return (
                        <TicketIdLabel
                          key={`${index}`}
                          id={`#${winningTicket.ticketId}`}
                          className="mb-2 bg-green-600"
                        />
                      );
                    }
                  )}
                </div>
                <Button
                  className="mt-1 justify-content-center"
                  onClick={() => {
                    window.open('https://www.dehub.net', '_blank');
                  }}
                  label="Get in touch!"
                />
              </>
            )}
            {!isFetchingWinners && myWinningTickets.length < 1 && (
              <Text className="font-bold">
                You didn't win this time...Better luck next time!
              </Text>
            )}
            {isFetchingWinners && (
              <Skeleton width="100%" height="2rem" className="mb-3" />
            )}
          </div>
          <div className="mb-3 flex flex-column">
            <Text className="font-bold text-center mb-3">All winners</Text>
            <div className="mb-4">
              {!isFetchingWinners ? (
                winners.map(
                  (winningTicket: LotteryTicketOwner, index: number) => {
                    return (
                      <TicketIdLabel
                        key={`${index}`}
                        id={`#${winningTicket.ticketId}`}
                        className="mb-2"
                      />
                    );
                  }
                )
              ) : (
                <Skeleton width="100%" height="2rem" className="mb-3" />
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ClaimDeGrandDialog;
