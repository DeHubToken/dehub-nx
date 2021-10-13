import { useEffect, useState } from 'react';
import { endOfMonth } from 'date-fns';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Hooks } from '@dehub/react/core';

import { SimpleCountDown } from './CountDown';

import { Text } from '../../components/Text';
import { TicketNumberLabel } from '../../components/TicketLabel';
import { LotteryTicketClaimData } from '../../config/constants/types';
import { LotteryTicket } from '../../config/constants/types';
import useGetUnclaimedRewards, {
  FetchStatus,
} from '../../hooks/useGetUnclaimedReward';

interface ClaimStage1DialogProps {
  open: boolean;
  onHide: () => void;
  roundId: string;
}

const ClaimStage1Dialog = ({
  open,
  onHide,
  roundId,
}: ClaimStage1DialogProps) => {
  const endOfMonthAsInt = endOfMonth(new Date()).getTime(); // end of month with 23:59:59
  const { fetchAllRewards, unclaimedRewards, fetchStatus } =
    useGetUnclaimedRewards();
  const isFetchingRewards = fetchStatus === FetchStatus.IN_PROGRESS;
  const { account } = Hooks.useMoralisEthers();

  useEffect(() => {
    fetchAllRewards(roundId);
  }, [account, roundId, fetchAllRewards]);

  return (
    <Dialog
      visible={open}
      modal
      className="p-fluid"
      header={`Round #${roundId}`}
      style={{ width: '250px' }}
      onHide={onHide}
    >
      <div className="flex flex-column">
        <div className="mb-2 flex justify-content-center">
          <Text>Unclaimed Total</Text>
        </div>
        <div className="mb-3 flex justify-content-center">
          <Text className="font-bold">******* DeHub</Text>
        </div>
        <div className="mb-3 flex flex-column align-items-center">
          <Text fontSize="12px">Will be burned in:</Text>
          <SimpleCountDown limitTime={endOfMonthAsInt} />
        </div>
        {isFetchingRewards ? (
          <Text>Loading...</Text>
        ) : (
          unclaimedRewards.map(
            (claimData: LotteryTicketClaimData, index: number) => {
              return (
                <div key={`${index}`} className="mt-2 mb-2">
                  <div className="mb-2">
                    <Text>Round #{claimData.roundId}</Text>
                  </div>
                  {claimData.ticketsWithUnclaimedRewards.map(
                    (ticket: LotteryTicket, index: number) => {
                      const ticketAsInt = parseInt(ticket.number, 10);
                      return (
                        <TicketNumberLabel
                          key={`${index}`}
                          number={ticketAsInt}
                          className="mb-2"
                        />
                      );
                    }
                  )}
                  {claimData.ticketsWithUnclaimedRewards.length > 0 && (
                    <div className="flex flex-column mt-5">
                      <Button className="justify-content-center">Claim</Button>
                    </div>
                  )}
                </div>
              );
            }
          )
        )}
        {}
      </div>
    </Dialog>
  );
};

export default ClaimStage1Dialog;
