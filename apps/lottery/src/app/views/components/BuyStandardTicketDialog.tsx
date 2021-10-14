import { useRef, useState } from 'react';
import { ethers } from 'ethers';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import { Hooks } from '@dehub/react/core';
import { getFullDisplayBalance } from '@dehub/shared/utils';
import { ethersToBigNumber } from '@dehub/shared/utils';

import { LotteryTicket } from '../../config/constants/types';
import { Header, Text } from '../../components/Text';
import {
  useDehubContract,
  useStandardLotteryContract,
} from '../../hooks/useContract';
import useApproveConfirmTransaction from '../../hooks/useApproveConfirmTransaction';
import { FetchStatus, useGetDehubBalance } from '../../hooks/useTokenBalance';
import { useLottery } from '../../states/standard-lottery/hooks';
import { getStandardLotteryAddress } from '../../utils/addressHelpers';
import { fetchUserTicketsAndLotteries } from '../../states/standard-lottery';
import { useAppDispatch } from '../../states';
import { DEHUB_DECIMALS } from '@dehub/shared/config';

const random = (minNumber: number, maxNumber: number): number => {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};
const randomTicket = () => {
  let num = 0;
  for (let idx = 0; idx < 4; idx++) {
    num = num * 100 + random(1, 18);
  }
  return num;
};

let newTickets: {
  tickets: number[];
  purchased: number;
  free: number;
} = {
  tickets: [],
  purchased: 0,
  free: 0,
};

interface BuyStandardTicketDialogProps {
  open: boolean;
  onHide: () => void;
}

const BuyStandardTicketDialog = ({
  open,
  onHide,
}: BuyStandardTicketDialogProps) => {
  const { balance: dehubBalance, fetchStatus } = useGetDehubBalance();
  const dispatch = useAppDispatch();

  const {
    currentLotteryId,
    currentRound: { priceTicketInDehub, userTickets },
  } = useLottery();
  const dehubContract = useDehubContract();
  const standardLotteryContract = useStandardLotteryContract();

  const { account } = Hooks.useMoralisEthers();

  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response = await dehubContract?.allowance(
          account,
          getStandardLotteryAddress()
        );
        const currentAllowance = ethersToBigNumber(response);
        return currentAllowance.gt(0);
      } catch (error) {
        return false;
      }
    },
    onApprove: () => {
      return dehubContract?.approve(
        getStandardLotteryAddress(),
        ethers.constants.MaxUint256
      );
    },
    onApproveSuccess: async () => {
      toast?.current?.show({
        severity: 'info',
        summary: 'Approved',
        detail: 'Contract enabled - you can now purchase tickets',
        life: 3000,
      });
      handleConfirm();
    },
    onConfirm: async () => {
      try {
        return await standardLotteryContract?.buyTickets(
          currentLotteryId,
          newTickets.purchased,
          newTickets.tickets
        );
      } catch (error) {
        // eslint-disable-next-line
        console.log(error.message);
        toast?.current?.show({
          severity: 'error',
          summary: 'Purchase tickets',
          detail: `Purchase tickets failed - ${
            // eslint-disable-next-line
            error?.data?.message ?? error.message
          }`,
          life: 3000,
        });
        return false;
      }
    },
    onSuccess: () => {
      toast?.current?.show({
        severity: 'info',
        summary: 'Purchase tickets',
        detail: 'Purchased tickets successfully',
        life: 3000,
      });
      dispatch(
        fetchUserTicketsAndLotteries({
          account: account?.toString() ?? '',
          currentLotteryId,
        })
      );
      onHide();
    },
  });

  const toast = useRef<Toast>(null);

  const generateTickets = (count: number): number[] => {
    const generatedTicketsNumbers: number[] = [];
    const newTicketsNumbers: number[] = [];

    if (userTickets && userTickets.isLoading) {
      userTickets.tickets?.map((ticket: LotteryTicket, index: number) => {
        const ticketAsInt = parseInt(ticket.number, 10);
        generatedTicketsNumbers.push(ticketAsInt);
        return true;
      });
    }

    for (let idx = 0; idx < count; idx++) {
      let num = randomTicket();
      while (
        generatedTicketsNumbers.includes(num) ||
        newTicketsNumbers.includes(num)
      ) {
        num = randomTicket();
      }
      newTicketsNumbers.push(num);
    }
    return newTicketsNumbers;
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="p-fluid"
        header="Buy Tickets"
        style={{ width: '350px' }}
        onHide={onHide}
      >
        <div className="flex flex-column">
          <div className="flex justify-content-end">
            {fetchStatus === FetchStatus.SUCCESS ? (
              <Text fontSize="12px">
                DeHub Balance:{' '}
                {getFullDisplayBalance(
                  dehubBalance,
                  DEHUB_DECIMALS,
                  DEHUB_DECIMALS
                )}
              </Text>
            ) : (
              <Text fontSize="12px">Loading...</Text>
            )}
          </div>
          <div className="flex flex-column mt-2">
            <Button
              className="justify-content-center"
              onClick={() => {
                newTickets = {
                  tickets: generateTickets(1),
                  purchased: 1,
                  free: 0,
                };
                isApproved ? handleConfirm() : handleApprove();
              }}
            >
              Buy a Single Ticket
            </Button>
          </div>
          <div className="flex justify-content-end mt-2">
            <Text fontSize="14px">
              Price: ~
              {getFullDisplayBalance(
                priceTicketInDehub,
                DEHUB_DECIMALS,
                DEHUB_DECIMALS
              )}{' '}
              DeHub
            </Text>
          </div>
          <div className="flex justify-content-center mt-4 mb-4">
            <Header>Or buy bundles instantly!</Header>
          </div>
          <div className="grid grid-nogutter align-items-center">
            <div className="col-6" />
            <div className="col-6 flex justify-content-end">
              <Text className="font-bold">Price in Dehub</Text>
            </div>
            <div className="col-6 mt-2">
              <Button
                onClick={() => {
                  newTickets = {
                    tickets: generateTickets(6),
                    purchased: 5,
                    free: 1,
                  };
                  isApproved ? handleConfirm() : handleApprove();
                }}
              >
                Buy 5 + 1 Free
              </Button>
            </div>
            <div className="col-6 mt-2 flex justify-content-end">
              <Text>
                ~
                {getFullDisplayBalance(
                  priceTicketInDehub.times(5),
                  DEHUB_DECIMALS,
                  DEHUB_DECIMALS
                )}
              </Text>
            </div>
            <div className="col-6 mt-2">
              <Button
                onClick={() => {
                  newTickets = {
                    tickets: generateTickets(13),
                    purchased: 10,
                    free: 3,
                  };
                  isApproved ? handleConfirm() : handleApprove();
                }}
              >
                Buy 10 + 3 Free
              </Button>
            </div>
            <div className="col-6 mt-2 flex justify-content-end">
              <Text>
                ~
                {getFullDisplayBalance(
                  priceTicketInDehub.times(10),
                  DEHUB_DECIMALS,
                  DEHUB_DECIMALS
                )}
              </Text>
            </div>
            <div className="col-6 mt-2">
              <Button
                onClick={() => {
                  newTickets = {
                    tickets: generateTickets(20),
                    purchased: 15,
                    free: 5,
                  };
                  isApproved ? handleConfirm() : handleApprove();
                }}
              >
                Buy 15 + 5 Free
              </Button>
            </div>
            <div className="col-6 mt-2 flex justify-content-end">
              <Text>
                ~
                {getFullDisplayBalance(
                  priceTicketInDehub.times(15),
                  DEHUB_DECIMALS,
                  DEHUB_DECIMALS
                )}
              </Text>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BuyStandardTicketDialog;
