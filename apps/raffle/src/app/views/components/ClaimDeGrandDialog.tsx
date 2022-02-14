import { Heading, Text } from '@dehub/react/ui';
import { shortenAddress } from '@dehub/shared/utils';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { TicketIdLabel } from '../../components/TicketLabel';
import { LotteryTicketOwner } from '../../config/constants/types';
import useGetDeGrandWinners, {
  FetchStatus,
} from '../../hooks/special-raffle/useGetDeGrandWinners';
import {
  useLottery,
  useThisMonthDeGrandPrize,
} from '../../states/special-raffle/hooks';

interface ClaimDeGrandDialogProps {
  open: boolean;
  onHide: () => void;
}

const ClaimDeGrandDialog = ({ open, onHide }: ClaimDeGrandDialogProps) => {
  const {
    currentLotteryId,
    currentRound: { deGrandStatus },
  } = useLottery();

  const { fetchAllWinners, winners, fetchStatus } = useGetDeGrandWinners();
  const isFetchingWinners =
    // fetchStatus === FetchStatus.NOT_FETCHED ||
    fetchStatus === FetchStatus.IN_PROGRESS;
  const { account } = useMoralis();
  const deGrandPrize = useThisMonthDeGrandPrize();
  const [myWinningTicketIds, setMyWinningTicketIds] = useState<string[]>([]);
  const [filteredWinners, setFilteredWiners] = useState<string[]>([]);

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (currentLotteryId) {
      fetchAllWinners(currentLotteryId);
    }
  }, [currentLotteryId, deGrandStatus, account, fetchAllWinners]);

  useEffect(() => {
    const winningTicketIds = winners.map((item: LotteryTicketOwner) =>
      item.owner === account ? item.ticketId : ''
    );
    const ticketIds = winningTicketIds.filter(
      (item: string) => item.length > 0
    );
    setMyWinningTicketIds(ticketIds);

    const winnerAddresses: string[] = [];
    winners.forEach((item: LotteryTicketOwner) => {
      if (!winnerAddresses.includes(item.owner)) {
        winnerAddresses.push(item.owner);
      }
    });
    setFilteredWiners(winnerAddresses);
  }, [winners, account]);

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="p-fluid"
        header={`Round #${currentLotteryId}`}
        style={{ width: '300px' }}
        onHide={onHide}
      >
        <div className="flex flex-column">
          <div className="mb-2 flex justify-content-center">
            <Heading>{`${deGrandPrize.title} Winners`}</Heading>
          </div>
          <div className="mb-3 flex flex-column">
            {!isFetchingWinners && myWinningTicketIds.length > 0 && (
              <>
                <Text className="font-bold text-center text-green-600 mb-3">
                  {`You won ${myWinningTicketIds.length}!`}
                </Text>
                <div className="mb-4">
                  {myWinningTicketIds.map(
                    (winningTicket: string, index: number) => {
                      return (
                        <TicketIdLabel
                          key={`${index}`}
                          id={`#${winningTicket}`}
                          className="mb-2 bg-green-600"
                        />
                      );
                    }
                  )}
                </div>
                <Button
                  className="mt-1 justify-content-center"
                  onClick={() => {
                    window.open(
                      `mailto:raffle@dehub.net?subject=I won DeGrand draw! What do I do now?`
                    );
                  }}
                  label="Get in touch!"
                />
              </>
            )}
            {!isFetchingWinners && myWinningTicketIds.length < 1 && (
              <Text className="font-bold text-center">
                You didn't win this time... Better luck next time!
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
                filteredWinners.length > 0 ? (
                  filteredWinners.map((winner: string, index: number) => {
                    return (
                      <TicketIdLabel
                        key={`${index}`}
                        id={`${shortenAddress(winner)}`}
                        className="mb-2"
                      />
                    );
                  })
                ) : (
                  <Text className="font-bold text-center">
                    Unfortunately, there is no winner.
                  </Text>
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
