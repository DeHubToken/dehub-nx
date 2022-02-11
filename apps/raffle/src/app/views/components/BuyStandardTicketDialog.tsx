import { DEHUB_DECIMALS } from '@dehub/shared/config';
import {
  ethersToBigNumber,
  getContract,
  getFullDisplayBalance,
} from '@dehub/shared/util';
import { MaxUint256 } from '@ethersproject/constants';
import { Web3Provider } from '@ethersproject/providers';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Header, Text } from '../../components/Text';
import Bep20Abi from '../../config/abis/erc20.json';
import { LotteryTicket } from '../../config/constants/types';
import useApproveConfirmTransaction from '../../hooks/useApproveConfirmTransaction';
import {
  useDehubContract,
  useStandardLotteryContract,
} from '../../hooks/useContract';
import { FetchStatus, useGetDehubBalance } from '../../hooks/useTokenBalance';
import { useAppDispatch } from '../../states';
import { fetchUserTicketsAndLotteries } from '../../states/standard-raffle';
import {
  useGetLotteryBundleRules,
  useLottery,
} from '../../states/standard-raffle/hooks';
import { LotteryBundleRule } from '../../states/standard-raffle/types';
import {
  getDehubAddress,
  getStandardLotteryAddress,
} from '../../utils/addressHelpers';
import { generateLotteryNumber } from '../../utils/numbers';

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
  const bundleRules = useGetLotteryBundleRules();

  const dehubContract = useDehubContract();
  const standardLotteryContract = useStandardLotteryContract();

  const { account } = useMoralis();
  const [pendingTx, setPendingTx] = useState(-1);

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
            getStandardLotteryAddress()
          );
          const currentAllowance = ethersToBigNumber(response);
          return currentAllowance.gt(0);
        } catch (error) {
          // console.error(error);
          return false;
        }
      },
      onApprove: async () => {
        try {
          return await dehubContract?.approve(
            getStandardLotteryAddress(),
            MaxUint256
          );
        } catch (error) {
          console.error(error);
          setPendingTx(-1);
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
          return await standardLotteryContract?.buyTickets(
            currentLotteryId,
            newTickets.purchased,
            newTickets.tickets
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
          setPendingTx(-1);
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
        setPendingTx(-1);
        // onHide();
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
      let num = generateLotteryNumber();
      while (
        generatedTicketsNumbers.includes(num) ||
        newTicketsNumbers.includes(num)
      ) {
        num = generateLotteryNumber();
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
              icon={pendingTx === 1 ? 'pi pi-spin pi-spinner' : ''}
              onClick={() => {
                if (pendingTx > 0) {
                  return;
                }
                newTickets = {
                  tickets: generateTickets(1),
                  purchased: 1,
                  free: 0,
                };
                setPendingTx(1);
                isApproved ? handleConfirm() : handleApprove();
              }}
              label="Buy a Single Ticket"
            />
          </div>
          <div className="flex justify-content-end mt-2">
            <Text fontSize="14px">Price: ~</Text>
            <Text fontSize="14px" className="font-bold">
              {getFullDisplayBalance(
                priceTicketInDehub,
                DEHUB_DECIMALS,
                DEHUB_DECIMALS
              )}
            </Text>
            <Text fontSize="14px">&nbsp; DeHub</Text>
          </div>
          <div className="flex justify-content-center mt-4 mb-4">
            <Header>Or buy bundles instantly!</Header>
          </div>
          <div className="grid grid-nogutter align-items-center">
            <div className="col-6" />
            <div className="col-6 flex justify-content-end">
              <Text className="font-bold">Price in DeHub</Text>
            </div>
            {bundleRules &&
              bundleRules.length > 0 &&
              bundleRules.map(
                (bundleRule: LotteryBundleRule, index: number) => {
                  return (
                    bundleRule.freeCount > 0 && (
                      <div
                        className="col-12 mt-2 flex flex-row"
                        key={`bundle-${index}`}
                      >
                        <div className="col-7">
                          <Button
                            icon={
                              pendingTx ===
                              bundleRule.purchasedCount + bundleRule.freeCount
                                ? 'pi pi-spin pi-spinner'
                                : ''
                            }
                            onClick={() => {
                              if (pendingTx > 0) {
                                return;
                              }
                              setPendingTx(
                                bundleRule.purchasedCount + bundleRule.freeCount
                              );
                              newTickets = {
                                tickets: generateTickets(
                                  bundleRule.purchasedCount +
                                    bundleRule.freeCount
                                ),
                                purchased: bundleRule.purchasedCount,
                                free: bundleRule.freeCount,
                              };
                              isApproved ? handleConfirm() : handleApprove();
                            }}
                            label={`Buy ${bundleRule.purchasedCount} ${
                              bundleRule.freeCount > 0
                                ? ' + ' + bundleRule.freeCount + ' Free'
                                : ''
                            }`}
                          />
                        </div>
                        <div className="col-5 flex justify-content-end align-items-center">
                          <Text className="font-bold">
                            ~
                            {getFullDisplayBalance(
                              priceTicketInDehub.times(
                                bundleRule.purchasedCount
                              ),
                              DEHUB_DECIMALS,
                              DEHUB_DECIMALS
                            )}
                          </Text>
                        </div>
                      </div>
                    )
                  );
                }
              )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BuyStandardTicketDialog;
