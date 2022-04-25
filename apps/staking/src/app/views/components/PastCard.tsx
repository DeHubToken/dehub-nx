import { ConnectWalletButton } from '@dehub/react/core';
import {
  Box,
  Heading,
  MultiStepWizard,
  SingleStepType,
  StepStatus,
  Text,
} from '@dehub/react/ui';
import {
  BUSD_DISPLAY_DECIMALS,
  DEHUB_DECIMALS,
  DEHUB_DISPLAY_DECIMALS,
} from '@dehub/shared/config';
import {
  BIG_ZERO,
  ethersToBigNumber,
  getFullDisplayBalance,
} from '@dehub/shared/utils';
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { MaxUint256 } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { cloneDeep } from 'lodash';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { useMemo, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import styled from 'styled-components';
import {
  useDehubContract,
  usePickStakingContract,
  usePickStakingControllerContract,
} from '../../hooks/useContract';
import {
  useBlockNumber,
  useDehubBusdPrice,
  usePools,
  useStakes,
} from '../../state/application/hooks';
import { getVersion } from '../../utils/contractHelpers';
import { quarterMark, quarterNumber } from '../../utils/pool';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

interface CardProps {
  poolIndex: number;
}

const initialSteps: SingleStepType[] = [
  {
    status: StepStatus.PENDING,
    title: 'Harvest & Withdraw',
    description: 'Harvest rewards and withdraw staked amount.',
    loading: false,
  },
  {
    status: StepStatus.PENDING,
    title: 'Approve',
    description: 'Allow to transfer your stake.',
    loading: false,
  },
  {
    status: StepStatus.PENDING,
    title: 'Deposit',
    description: 'Transfer your stake to the new quarter vault.',
    loading: false,
  },
];

const PastCard = ({ poolIndex }: CardProps) => {
  const { account } = useMoralis();
  const stakingController: Contract | null = usePickStakingControllerContract();
  const stakingContract: Contract | null = usePickStakingContract(poolIndex);
  const dehubContract = useDehubContract();

  const blockNumber = useBlockNumber();
  const { pools } = usePools();
  const poolInfo = pools[poolIndex];
  const { userInfos, userInfosLoading, pendingHarvestLoading } = useStakes();
  const userStakeInfo =
    userInfosLoading || pendingHarvestLoading
      ? undefined
      : userInfos[poolIndex];
  const deHubPriceInBUSD = useDehubBusdPrice();

  const [pendingHarvestTx, setPendingHarvestTx] = useState(false);
  const [multiStepWizard, setMultiStepWizard] = useState<boolean>(false);
  const [restakeSteps, setRestakeSteps] =
    useState<SingleStepType[]>(initialSteps);

  const quarterNum = useMemo(() => quarterNumber(poolInfo), [poolInfo]);
  const toast = useRef<Toast>(null);

  const handleHarvest = async () => {
    setPendingHarvestTx(true);

    try {
      if (stakingContract && stakingController) {
        const isV1Quarter = (await getVersion(stakingContract)) === 1;

        const tx: TransactionResponse = isV1Quarter
          ? await stakingContract.harvestAndWithdraw()
          : await stakingController.harvestAndWithdraw(quarterNum);
        const receipt: TransactionReceipt = await tx.wait();
        if (receipt.status) {
          toast?.current?.show({
            severity: 'info',
            summary: 'Harvest & unstake',
            detail: 'Harvest & unstake successfully. Please check your wallet.',
            life: 4000,
          });
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast?.current?.show({
        severity: 'error',
        summary: 'Harvest & unstake',
        detail: `Harvest & unstake failed - ${
          error?.data?.message ?? error.message
        }`,
        life: 4000,
      });
    } finally {
      setPendingHarvestTx(false);
    }
  };

  const updateRestakeStep = (
    steps: SingleStepType[],
    index: number,
    status: StepStatus,
    errorMsg?: string
  ) => {
    if (index >= restakeSteps.length) return steps;
    steps[index].status = status;
    steps[index].errorMsg = errorMsg;

    setRestakeSteps(steps);
    return steps;
  };

  const handleRestake = async () => {
    if (
      !stakingContract ||
      !stakingController ||
      pendingHarvestLoading ||
      !userStakeInfo
    )
      return;

    const isV1Quarter = (await getVersion(stakingContract)) === 1;

    // Get pending harvest amount and staked amount to restake
    const restakeAmount = userStakeInfo.pendingHarvest.plus(
      userStakeInfo.amount
    );

    let steps = cloneDeep(restakeSteps);

    // First step
    try {
      steps = updateRestakeStep(steps, 0, StepStatus.DOING);
      const txHarvest: TransactionResponse = isV1Quarter
        ? await stakingContract.harvestAndWithdraw()
        : await stakingController.harvestAndWithdraw(quarterNum);
      const receiptHarvest: TransactionReceipt = await txHarvest.wait();
      if (!receiptHarvest.status) {
        steps = updateRestakeStep(
          steps,
          0,
          StepStatus.FAILED,
          'Harvest & Withdraw failed. Please check your wallet.'
        );
        toast?.current?.show({
          severity: 'error',
          summary: 'Restake',
          detail: 'Harvest & Withdraw failed. Please check your wallet.',
          life: 4000,
        });
        return;
      }

      steps = updateRestakeStep(steps, 0, StepStatus.DONE);
      toast?.current?.show({
        severity: 'info',
        summary: 'Restake',
        detail: 'Harvest & Withdraw successfully. Please check your wallet.',
        life: 4000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      steps = updateRestakeStep(
        steps,
        0,
        StepStatus.FAILED,
        error?.data?.message ?? error.message
      );
      toast?.current?.show({
        severity: 'error',
        summary: 'Restake',
        detail: `Harvest & Withdraw failed - ${
          error?.data?.message ?? error.message
        }`,
        life: 4000,
      });
      return;
    }

    steps = updateRestakeStep(steps, 0, StepStatus.DONE);

    // Second step
    try {
      steps = updateRestakeStep(steps, 1, StepStatus.DOING);

      const activeStakingAddress: string =
        await stakingController.getActiveStaking();
      const allowance = ethersToBigNumber(
        await dehubContract?.allowance(account, activeStakingAddress)
      );

      if (allowance.lt(restakeAmount)) {
        const txApprove = await dehubContract?.approve(
          activeStakingAddress,
          MaxUint256
        );
        const receipt = await txApprove.wait();

        if (!receipt.status) {
          const errorMsg =
            'Please try again. Confirm the transaction and make sure you are paying enough gas!';
          steps = updateRestakeStep(steps, 1, StepStatus.FAILED, errorMsg);

          toast?.current?.show({
            severity: 'error',
            summary: 'Restake',
            detail: errorMsg,
            life: 4000,
          });
          return;
        }
      }
      steps = updateRestakeStep(steps, 1, StepStatus.DONE);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      steps = updateRestakeStep(
        steps,
        1,
        StepStatus.FAILED,
        error?.data?.message ?? error.message
      );
      toast?.current?.show({
        severity: 'error',
        summary: 'Restake',
        detail: `Approve failed - ${error?.data?.message ?? error.message}`,
        life: 4000,
      });
      return;
    }

    // Final step
    try {
      steps = updateRestakeStep(steps, 2, StepStatus.DOING);
      const txDeposit: TransactionResponse = await stakingController.deposit(
        restakeAmount?.toString()
      );
      const receiptDeposit: TransactionReceipt = await txDeposit.wait();
      if (!receiptDeposit.status) {
        steps = updateRestakeStep(
          steps,
          2,
          StepStatus.FAILED,
          'Deposit failed. Please check your wallet.'
        );
        toast?.current?.show({
          severity: 'error',
          summary: 'Restake',
          detail: 'Deposit failed. Please check your wallet.',
          life: 4000,
        });
        return;
      }

      steps = updateRestakeStep(steps, 2, StepStatus.DONE);
      toast?.current?.show({
        severity: 'info',
        summary: 'Restake',
        detail: 'Deposit successfully. Please check your wallet.',
        life: 4000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      updateRestakeStep(
        steps,
        2,
        StepStatus.FAILED,
        error?.data?.message ?? error.message
      );
      toast?.current?.show({
        severity: 'error',
        summary: 'Restake',
        detail: `Deposit failed - ${error?.data?.message ?? error.message}`,
        life: 4000,
      });
      return;
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Card className="border-neon-1 overflow-hidden mt-5">
        <StyledBox>
          <Heading
            className="py-2 px-3 inline-flex border-neon-1"
            style={{
              borderRadius: '8px',
              background:
                'linear-gradient(50deg, rgba(46,59,78,1) 0%, rgba(158,198,223,1) 48%, rgba(46,59,78,1) 100%)',
            }}
          >
            <span style={{ fontWeight: 900 }}>{quarterMark(poolInfo)}</span>
          </Heading>

          <div className="grid mt-2">
            <div className="col-12 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Heading className="pb-1">Your Stake</Heading>
                  {account && userStakeInfo ? (
                    <>
                      <Text fontSize="24px" fontWeight={900}>
                        {getFullDisplayBalance(
                          userStakeInfo.amount,
                          DEHUB_DECIMALS
                        )}
                      </Text>
                      <Text>
                        $
                        {getFullDisplayBalance(
                          userStakeInfo.amount.times(deHubPriceInBUSD),
                          DEHUB_DECIMALS,
                          BUSD_DISPLAY_DECIMALS
                        )}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Skeleton width="100%" height="1.5rem" />
                      <Skeleton width="100%" height="1.5rem" className="mt-2" />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Heading className="pb-1">Withdrawable Rewards</Heading>
                  {account && userStakeInfo ? (
                    <>
                      <Text fontSize="24px" fontWeight={900}>
                        {getFullDisplayBalance(
                          !userStakeInfo.harvested
                            ? userStakeInfo.pendingHarvest
                            : BIG_ZERO,
                          DEHUB_DECIMALS,
                          DEHUB_DISPLAY_DECIMALS
                        )}
                      </Text>
                      <Text>$DeHub</Text>
                    </>
                  ) : (
                    <>
                      <Skeleton width="100%" height="1.5rem" />
                      <Skeleton width="100%" height="1.5rem" className="mt-2" />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 align-self-start">
              {blockNumber && poolInfo.closeBlock > blockNumber && (
                <Text>
                  Blocks left until harvest: {poolInfo.closeBlock - blockNumber}
                </Text>
              )}
              {account ? (
                <>
                  <Button
                    className="p-button mt-2 justify-content-center mr-3"
                    label="Harvest & Unstake"
                    disabled={
                      poolInfo.paused ||
                      !userStakeInfo ||
                      userStakeInfo.harvested ||
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      poolInfo.closeBlock > blockNumber!
                    }
                    onClick={handleHarvest}
                    loading={pendingHarvestTx}
                    loadingIcon={'pi pi-spin pi-spinner'}
                  />
                  <Button
                    className="p-button-outlined mt-2 justify-content-center text-white border-primary"
                    label="Restake"
                    disabled={
                      poolInfo.paused ||
                      !userStakeInfo ||
                      userStakeInfo.harvested ||
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      poolInfo.closeBlock > blockNumber!
                    }
                    onClick={() => {
                      setRestakeSteps(initialSteps);
                      setMultiStepWizard(true);
                    }}
                  />
                </>
              ) : (
                <ConnectWalletButton />
              )}
            </div>
          </div>
        </StyledBox>
      </Card>

      <MultiStepWizard
        visible={multiStepWizard}
        onDismiss={() => setMultiStepWizard(false)}
        title="Restake"
        steps={restakeSteps}
        execute={handleRestake}
        isAvailable={() => {
          const failed = restakeSteps.filter(
            (step: SingleStepType) => step.status === StepStatus.FAILED
          );
          const done = restakeSteps.filter(
            (step: SingleStepType) => step.status === StepStatus.DONE
          );
          return failed.length > 0 || done.length === restakeSteps.length;
        }}
        isExecuting={() => {
          const doing = restakeSteps.filter(
            (step: SingleStepType) => step.status === StepStatus.DOING
          );
          return doing.length > 0;
        }}
      />
    </>
  );
};

export default PastCard;
