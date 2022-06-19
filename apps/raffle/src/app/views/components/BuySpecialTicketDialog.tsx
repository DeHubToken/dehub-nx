import {
  useApproveConfirmTransaction,
  useWeb3Context,
} from '@dehub/react/core';
import { BalanceInput, Text } from '@dehub/react/ui';
import Bep20Abi from '@dehub/shared/asset/dehub/abis/erc20.json';
import { DEHUB_DECIMALS } from '@dehub/shared/config';
import {
  ethersToBigNumber,
  getContract,
  getFullDisplayBalance,
} from '@dehub/shared/utils';
import { MaxUint256 } from '@ethersproject/constants';
import { Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useCallback, useRef, useState } from 'react';
import {
  useDehubContract,
  useSpecialLotteryContract,
} from '../../hooks/useContract';
import { FetchStatus, useGetDehubBalance } from '../../hooks/useTokenBalance';
import { useAppDispatch } from '../../states';
import { fetchUserTicketsAndLotteries } from '../../states/special-raffle';
import { useLottery } from '../../states/special-raffle/hooks';
import {
  getDehubAddress,
  getSpecialLotteryAddress,
} from '../../utils/addressHelpers';

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
    currentRound: { priceTicketInDehub },
  } = useLottery();
  const [ticketsToBuy, setTicketsToBuy] = useState('0');
  const [userNotEnoughDehub, setUserNotEnoughDehub] = useState(false);
  const [maxTicketPurchaseExceeded, setMaxTicketPurchaseExceeded] =
    useState(false);
  const [pendingTx, setPendingTx] = useState(false);
  const { balance: dehubBalance, fetchStatus } = useGetDehubBalance();

  const dehubContract = useDehubContract();
  const specialLotteryContract = useSpecialLotteryContract();

  const { account } = useWeb3Context();

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
  const { isApproved, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
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
            approvalAccount,
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
          if (!dehubContract) return false;
          return await dehubContract.approve(
            getSpecialLotteryAddress(),
            MaxUint256
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
          life: 4000,
        });
        handleConfirm();
      },
      onConfirm: async () => {
        try {
          if (!specialLotteryContract) return false;
          return await specialLotteryContract.buyTickets(
            currentLotteryId,
            ticketsToBuy
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(error.message);
          toast?.current?.show({
            severity: 'error',
            summary: 'Purchase tickets',
            detail: `Purchase tickets failed - ${
              error?.data?.message ?? error.message
            }`,
            life: 4000,
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
          life: 4000,
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
      onFail: () => {
        setPendingTx(false);
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
            } $DeHub`}
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

          <div className="flex justify-content-end mt-2 mb-5">
            <Text>
              These tickets will be eligible for the DeRaffles Stage Two final
              pot draw and the DeGrand prize draw.
            </Text>
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
