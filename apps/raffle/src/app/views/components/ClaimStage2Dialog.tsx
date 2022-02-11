import { DEHUB_DECIMALS } from '@dehub/shared/config';
import { getBalanceNumber } from '@dehub/shared/util';
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { endOfMonth } from 'date-fns';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Text } from '../../components/Text';
import { TicketIdLabel } from '../../components/TicketLabel';
import { LotteryTicket } from '../../config/constants/types';
import useGetDeLottoWinningRewards, {
  FetchStatus,
} from '../../hooks/special-raffle/useGetDeLottoWinningRewards';
import { useSpecialLotteryContract } from '../../hooks/useContract';
import { useLottery } from '../../states/special-raffle/hooks';
import { utcToLocal } from '../../utils/dateHelpers';
import { SimpleCountDown } from './CountDown';

interface ClaimStage2DialogProps {
  open: boolean;
  onHide: () => void;
}

const ClaimStage2Dialog = ({ open, onHide }: ClaimStage2DialogProps) => {
  const {
    currentLotteryId,
    currentRound: { deLottoStatus },
  } = useLottery();

  // end of month with 23:59:59
  const endOfMonthAsInt = utcToLocal(
    endOfMonth(Date.now()).getTime()
  ).getTime();

  const { fetchAllRewards, winningRewards, fetchStatus } =
    useGetDeLottoWinningRewards();
  const isFetchingRewards =
    // fetchStatus === FetchStatus.NOT_FETCHED ||
    fetchStatus === FetchStatus.IN_PROGRESS;
  const { account } = useMoralis();
  const [pendingTx, setPendingTx] = useState(false);
  const lotteryContract = useSpecialLotteryContract();
  const [claimed, setClaimed] = useState(false);

  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchAllRewards();
  }, [account, currentLotteryId, deLottoStatus, claimed, fetchAllRewards]);

  const handleClaim = async () => {
    const ticketIds = winningRewards?.ticketsWithUnclaimedRewards.map(
      (ticket: LotteryTicket, index: number) => ticket.id
    );

    setPendingTx(true);
    try {
      if (lotteryContract) {
        const tx: TransactionResponse = await lotteryContract.claimTickets(
          currentLotteryId,
          ticketIds
        );
        const receipt: TransactionReceipt = await tx.wait();
        if (receipt.status) {
          toast?.current?.show({
            severity: 'info',
            summary: 'Claim tickets',
            detail: 'Claim tickets successfully. Please check your wallet.',
            life: 4000,
          });
          setClaimed(true);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast?.current?.show({
        severity: 'error',
        summary: 'Claim tickets',
        detail: `Claim tickets failed - ${
          error?.data?.message ?? error.message
        }`,
        life: 4000,
      });
    }
    setPendingTx(false);
    onHide();
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="p-fluid"
        header={`Unclaimed Winnings`}
        style={{ width: '300px' }}
        onHide={onHide}
      >
        <div className="flex flex-column">
          <div className="mb-2 flex justify-content-center">
            <Text fontWeight={900}>Unclaimed Total in 'Stage Two'</Text>
          </div>
          <div className="mt-2 mb-3 flex justify-content-center">
            {winningRewards ? (
              <Text fontSize="22px" fontWeight={900} textAlign="center">
                {getBalanceNumber(winningRewards.dehubTotal, DEHUB_DECIMALS)}{' '}
                <Text fontSize="13px" className="inline-block">
                  $DeHub
                </Text>
              </Text>
            ) : (
              <Skeleton width="100%" height="2rem" />
            )}
          </div>
          <div className="mb-3 flex flex-column align-items-center">
            <Text fontSize="12px">Will be burned in:</Text>
            <SimpleCountDown limitTime={Math.floor(endOfMonthAsInt / 1000)} />
          </div>
          {isFetchingRewards ? (
            <Skeleton width="100%" height="2rem" className="mb-4" />
          ) : (
            <div className="mb-4">
              {winningRewards &&
                winningRewards.ticketsWithUnclaimedRewards.map(
                  (ticket: LotteryTicket, index: number) => {
                    return (
                      <TicketIdLabel
                        key={`${index}`}
                        id={`#${ticket.id}`}
                        className="mb-2"
                      />
                    );
                  }
                )}
              {winningRewards &&
                winningRewards.ticketsWithUnclaimedRewards.length > 0 && (
                  <div className="flex flex-column mt-5">
                    <Button
                      icon={pendingTx ? 'pi pi-spin pi-spinner' : ''}
                      className="justify-content-center"
                      onClick={() => {
                        if (pendingTx) {
                          return;
                        }
                        handleClaim();
                      }}
                      label="Claim Now"
                    />
                  </div>
                )}
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ClaimStage2Dialog;
