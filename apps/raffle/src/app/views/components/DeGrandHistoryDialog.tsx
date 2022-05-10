import { useWeb3Context } from '@dehub/react/core';
import { Heading, Text } from '@dehub/react/ui';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { TicketIdLabel } from '../../components/TicketLabel';
import { LotteryTicketOwner } from '../../config/constants/types';
import {
  FetchStatus,
  useGetHistoricalDeGrands,
} from '../../hooks/special-raffle/useGetDeGrandWinners';
import { useLottery } from '../../states/special-raffle/hooks';
import { DeGrandHistory } from '../../states/special-raffle/types';
import DeGrandWinnersDialog from './DeGrandWinnersDialog';

interface DeGrandHistoryDialogProps {
  open: boolean;
  onHide: () => void;
}

const DeGrandHistoryDialog = ({ open, onHide }: DeGrandHistoryDialogProps) => {
  const { currentLotteryId } = useLottery();
  const { fetchHistoricalAllWinners, historicalDeGrands, fetchStatus } =
    useGetHistoricalDeGrands();
  const isFetchingWinners =
    // fetchStatus === FetchStatus.NOT_FETCHED ||
    fetchStatus === FetchStatus.IN_PROGRESS;
  const { account } = useWeb3Context();
  const [deGrand, setDeGrand] = useState<DeGrandHistory>();
  const [allWinnersDialog, setAllWinnersDialog] = useState(false);

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (currentLotteryId) {
      fetchHistoricalAllWinners(currentLotteryId);
    }
  }, [currentLotteryId, fetchHistoricalAllWinners]);

  useEffect(() => {
    if (account && historicalDeGrands) {
      for (let idx = 0; idx < historicalDeGrands.length; idx++) {
        const winningTicketIds: string[] = historicalDeGrands[idx].winners.map(
          (item: LotteryTicketOwner) =>
            item.owner === account ? item.ticketId : ''
        );
        const ticketIds = winningTicketIds.filter(
          (item: string) => item.length > 0
        );
        historicalDeGrands[idx].myWinningTickets = ticketIds;

        const winnerAddresses: string[] = [];
        historicalDeGrands[idx].winners.forEach((item: LotteryTicketOwner) => {
          if (!winnerAddresses.includes(item.owner)) {
            winnerAddresses.push(item.owner);
          }
        });

        historicalDeGrands[idx].winningAddresses = winnerAddresses;
      }
    }
  }, [account, historicalDeGrands]);

  const handleShowWinnersDialog = (deGrand: DeGrandHistory) => {
    setDeGrand(deGrand);
    setAllWinnersDialog(true);
  };
  const handleHideWinnerDialog = () => {
    setAllWinnersDialog(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="p-fluid"
        header="DeGrand History"
        style={{ width: '300px' }}
        onHide={onHide}
      >
        <div className="flex flex-column">
          {isFetchingWinners ? (
            <Skeleton width="100%" height="4rem" className="mb-3" />
          ) : historicalDeGrands.length > 0 ? (
            historicalDeGrands.map((deGrand: DeGrandHistory, index: number) => {
              return (
                <div className="flex flex-column" key={`${index}`}>
                  <div className="mb-2 flex justify-content-center">
                    <Heading>{`Round #${deGrand.roundId}`}</Heading>
                  </div>
                  <div className="mb-2 flex justify-content-center">
                    <Heading>{`Prize: ${deGrand.prize.title}`}</Heading>
                  </div>
                  <div className="mb-3 flex flex-column">
                    {deGrand.myWinningTickets &&
                    deGrand.myWinningTickets.length > 0 ? (
                      <>
                        <Text className="font-bold text-center text-green-600 mb-3">
                          {`You won ${deGrand.myWinningTickets.length}!`}
                        </Text>
                        <div className="mb-4">
                          {deGrand.myWinningTickets.map(
                            (ticketId: string, index: number) => {
                              return (
                                <TicketIdLabel
                                  key={`${index}`}
                                  id={`#${ticketId}`}
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
                    ) : (
                      <Text className="font-bold text-center">
                        You didn't win this time... Better luck next time!
                      </Text>
                    )}
                  </div>
                  <Button
                    className="p-button-link p-0"
                    onClick={() => handleShowWinnersDialog(deGrand)}
                    label="View all winners"
                  />
                </div>
              );
            })
          ) : (
            <Text className="font-bold text-center">
              You haven't participated in any previous DeGrand draws.
              <br /> <br />
              Make sure to get a ticket for the next one!
            </Text>
          )}

          {deGrand && (
            <DeGrandWinnersDialog
              open={allWinnersDialog}
              onHide={() => handleHideWinnerDialog()}
              deGrand={deGrand}
            />
          )}
        </div>
      </Dialog>
    </>
  );
};

export default DeGrandHistoryDialog;
