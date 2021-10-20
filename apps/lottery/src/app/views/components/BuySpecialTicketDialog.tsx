import { useCallback, useState, useRef } from 'react';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import { Hooks } from '@dehub/react/core';
import { DEHUB_DECIMALS } from '@dehub/shared/config';
import {
  ethersToBigNumber,
  getContract,
  getFullDisplayBalance,
} from '@dehub/shared/utils';

import Bep20Abi from '../../config/abis/erc20.json';
import BalanceInput from '../../components/BalanceInput/BalanceInput';
import { Text } from '../../components/Text';
import {
  useDehubContract,
  useSpecialLotteryContract,
} from '../../hooks/useContract';
import useApproveConfirmTransaction from '../../hooks/useApproveConfirmTransaction';
import { FetchStatus, useGetDehubBalance } from '../../hooks/useTokenBalance';
import { useAppDispatch } from '../../states';
import { useLottery } from '../../states/special-lottery/hooks';
import { fetchUserTicketsAndLotteries } from '../../states/special-lottery';
import {
  getDehubAddress,
  getSpecialLotteryAddress,
} from '../../utils/addressHelpers';
import { Web3Provider } from '@ethersproject/providers';

interface BuySpecialTicketDialogProps {
  open: boolean;
  onHide: () => void;
}

const BuySpecialTicketDialog = ({
  open,
  onHide,
}: BuySpecialTicketDialogProps) => {
  const dispatch = useAppDispatch();
  const {
    currentLotteryId,
    maxNumberTicketsPerBuyOrClaim,
    currentRound: { priceTicketInDehub, userTickets },
  } = useLottery();
  const [ticketsToBuy, setTicketsToBuy] = useState('0');
  const [userNotEnoughDehub, setUserNotEnoughDehub] = useState(false);
  const [maxTicketPurchaseExceeded, setMaxTicketPurchaseExceeded] =
    useState(false);
  const [pendingTx, setPendingTx] = useState(false);
  const { balance: dehubBalance, fetchStatus } = useGetDehubBalance();

  const dehubContract = useDehubContract();
  const specialLotteryContract = useSpecialLotteryContract();

  const { account } = Hooks.useMoralisEthers();

  const limitNumberByMaxTicketsPerBuy = useCallback(
    (number: BigNumber) => {
      return number.gt(maxNumberTicketsPerBuyOrClaim)
        ? maxNumberTicketsPerBuyOrClaim
        : number;
    },
    [maxNumberTicketsPerBuyOrClaim]
  );

  const validateInput = useCallback(
    (inputNumber: BigNumber): boolean => {
      // eslint-disable-next-line multiline-comment-style
      // const totalNumber = inputNumber.plus(
      //   new BigNumber(
      //     userTickets && userTickets?.tickets ? userTickets?.tickets?.length : 0
      //   )
      // );
      const limitedNumberTickets = limitNumberByMaxTicketsPerBuy(inputNumber);
      const dehubCost = priceTicketInDehub.times(limitedNumberTickets);

      if (dehubCost.gt(dehubBalance)) {
        setUserNotEnoughDehub(true);
        return false;
      } else if (limitedNumberTickets.eq(maxNumberTicketsPerBuyOrClaim)) {
        setMaxTicketPurchaseExceeded(true);
        return true;
      } else {
        setUserNotEnoughDehub(false);
        setMaxTicketPurchaseExceeded(false);
        return true;
      }
    },
    [
      limitNumberByMaxTicketsPerBuy,
      priceTicketInDehub,
      maxNumberTicketsPerBuyOrClaim,
      dehubBalance,
    ]
  );

  const handleInputChange = (input: string) => {
    // Force input to integer
    const inputAsInt = parseInt(input, 10);
    const inputAsBN = new BigNumber(inputAsInt);
    const limitedNumberTickets = limitNumberByMaxTicketsPerBuy(inputAsBN);
    validateInput(inputAsBN);
    setTicketsToBuy(inputAsInt ? limitedNumberTickets.toString() : '0');
  };
  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async (
      provider: Web3Provider,
      approvalAccount: string
    ) => {
      try {
        const tokenContract = getContract(
          getDehubAddress(),
          Bep20Abi,
          provider,
          approvalAccount
        );
        const response = await tokenContract.allowance(
          account,
          getSpecialLotteryAddress()
        );
        const currentAllowance = ethersToBigNumber(response);
        return currentAllowance.gt(0);
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    onApprove: async () => {
      try {
        return await dehubContract?.approve(
          getSpecialLotteryAddress(),
          ethers.constants.MaxUint256
        );
      } catch (error) {
        console.error(error);
        setPendingTx(false);
        return false;
      }
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
        return await specialLotteryContract?.buyTickets(
          currentLotteryId,
          ticketsToBuy
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
        setPendingTx(false);
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
      setPendingTx(false);
      // onHide();
    },
  });

  const toast = useRef<Toast>(null);

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
          <div className="flex justify-content-between mb-2">
            <Text>Buy:</Text>
            <Text className="font-bold">Tickets</Text>
          </div>
          <BalanceInput
            isWarning={
              account && (userNotEnoughDehub || maxTicketPurchaseExceeded)
                ? true
                : false
            }
            placeholder="0"
            value={ticketsToBuy}
            onUserInput={handleInputChange}
            currencyValue={`~${
              ticketsToBuy
                ? getFullDisplayBalance(
                    priceTicketInDehub.times(new BigNumber(ticketsToBuy)),
                    DEHUB_DECIMALS,
                    DEHUB_DECIMALS
                  )
                : '0.00'
            } $Dehub`}
          />
          <div className="flex justify-content-end mt-2 mb-5">
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
              icon={pendingTx ? 'pi pi-spin pi-spinner' : ''}
              className="justify-content-center"
              onClick={() => {
                if (pendingTx) {
                  return;
                }
                if (!validateInput(new BigNumber(parseInt(ticketsToBuy, 10)))) {
                  return;
                }
                /*
                 * const totalNumber = new BigNumber(ticketsToBuy, 10).plus(
                 *   new BigNumber(
                 *     userTickets && userTickets?.tickets
                 *       ? userTickets?.tickets?.length
                 *       : 0
                 *   )
                 * );
                 * if (
                 *   totalNumber.eq(limitNumberByMaxTicketsPerBuy(totalNumber))
                 * ) {
                 *   return;
                 * }
                 */
                setPendingTx(true);
                isApproved ? handleConfirm() : handleApprove();
              }}
              label="Buy Now"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BuySpecialTicketDialog;
