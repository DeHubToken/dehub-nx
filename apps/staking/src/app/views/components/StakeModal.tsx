import { ConnectWalletButton, useWeb3Context } from '@dehub/react/core';
import { BalanceInput, Box, Text } from '@dehub/react/ui';
import { DEHUB_DECIMALS, DEHUB_DISPLAY_DECIMALS } from '@dehub/shared/config';
import {
  BIG_ZERO,
  getBalanceAmount,
  getDecimalAmount,
} from '@dehub/shared/utils';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { MaxUint256 } from '@ethersproject/constants';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {
  InputNumber,
  InputNumberValueChangeParams,
} from 'primereact/inputnumber';
import { Skeleton } from 'primereact/skeleton';
import { Slider, SliderChangeParams } from 'primereact/slider';
import { Toast } from 'primereact/toast';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { DAY_IN_SECONDS } from '../../config/constants';
import { FetchStatus } from '../../config/constants/types';
import {
  useDehubContract,
  usePickStakingContract,
} from '../../hooks/useContract';
import { useGetDehubBalance } from '../../hooks/useTokenBalance';
import { useFetchPool } from '../../state/application/hooks';
import { getStakingAddress } from '../../utils/addressHelpers';

interface StakeModalProps {
  open: boolean;
  onHide: () => void;
}

const SimpleGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: 10px;
  margin-bottom: 16px;
`;

const percentShortcuts = [10, 25, 50, 75, 100];

const StakeModal: React.FC<StakeModalProps> = ({ open, onHide }) => {
  const { account } = useWeb3Context();
  const dehubContract = useDehubContract();
  const stakingContract = usePickStakingContract();

  const { updatePool, updateUser } = useFetchPool();
  const { balance: dehubBalance, fetchStatus: fetchBalanceStatus } =
    useGetDehubBalance();

  const [value, setValue] = useState<string>('');
  const [isTxPending, setIsTxPending] = useState(false);
  const [disableStake, setDisableStake] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [period, setPeriod] = useState<number>(1);
  const [unlockDate, setUnlockDate] = useState(new Date());

  const toast = useRef<Toast>(null);

  const maxBalance = useMemo(
    () =>
      fetchBalanceStatus === FetchStatus.SUCCESS
        ? getBalanceAmount(dehubBalance, DEHUB_DECIMALS).toNumber()
        : BIG_ZERO.toNumber(),
    [fetchBalanceStatus, dehubBalance]
  );

  const valueAsBn = new BigNumber(value);

  const showFieldWarning =
    !!account && valueAsBn.gt(0) && errorMessage !== null;

  const handleChange = (input: string) => {
    setValue(input);
  };

  const handleSliderChange = (e: SliderChangeParams) => {
    setValue((e.value as number).toFixed(DEHUB_DISPLAY_DECIMALS).toString());
  };

  const handlePeriodChange = (e: InputNumberValueChangeParams) => {
    const days = Number(e.value);
    setPeriod(days);
    const now = new Date().getTime() + days * DAY_IN_SECONDS * 1000;
    setUnlockDate(new Date(now));
  };

  const handleEnterPosition = async () => {
    if (!dehubContract || !stakingContract) return;

    try {
      const decimalValue = getDecimalAmount(valueAsBn, DEHUB_DECIMALS);
      const allowance = await dehubContract.allowance(
        account,
        getStakingAddress()
      );
      setIsTxPending(true);
      if (allowance < decimalValue.toNumber()) {
        const txApprove = await dehubContract.approve(
          getStakingAddress(),
          MaxUint256
        );
        const receipt = await txApprove.wait();

        if (!receipt.status) {
          const errorMsg =
            'Please try again. Confirm the transaction and make sure you are paying enough gas!';

          toast?.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: errorMsg,
            life: 4000,
          });
          setIsTxPending(false);
          return;
        }
      }

      const tx = await stakingContract.stake(
        period * DAY_IN_SECONDS,
        EthersBigNumber.from(decimalValue.toString())
      );
      const receipt: TransactionReceipt = await tx.wait();

      updatePool();
      updateUser();

      if (receipt.status) {
        toast?.current?.show({
          severity: 'success',
          summary: `Success`,
          detail: (
            <Box>
              <Text style={{ marginBottom: '8px' }}>
                {`${valueAsBn.toString()} $DeHub has been successfully staked!`}
              </Text>
            </Box>
          ),
          life: 4000,
        });
      }
      onHide();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Staking failed - ${error?.data?.message ?? error.message}`,
        life: 4000,
      });
    }
    setIsTxPending(false);
  };

  // Warnings
  useEffect(() => {
    const bnValue = new BigNumber(value);
    if (bnValue.lt(BIG_ZERO) || bnValue.isNaN()) {
      setErrorMessage('Invalid amount');
    } else if (bnValue.gt(maxBalance)) {
      setErrorMessage('Insufficient $DHB balance');
    } else {
      setDisableStake(false);
      setErrorMessage(null);
      return;
    }
    setDisableStake(true);
  }, [value, maxBalance, setErrorMessage]);

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="border-neon-1"
        header={`Stake Your Tokens`}
        onHide={onHide}
        style={{
          minWidth: '288px',
          maxWidth: '400px',
          marginTop: '124px',
          position: 'relative',
        }}
      >
        <div className="flex flex-column">
          <div
            className="flex align-items-center justify-content-between"
            style={{ marginBottom: '8px' }}
          >
            <div className="flex align-items-center">
              <Text fontWeight={600}>{`Stake:`}</Text>
            </div>
            <div className="flex align-items-center">
              <Text fontWeight={600} textTransform="uppercase">
                $DHB
              </Text>
            </div>
          </div>
          <BalanceInput
            value={value}
            onUserInput={handleChange}
            isWarning={showFieldWarning}
            inputProps={{ disabled: !account || isTxPending }}
          />
          {showFieldWarning && (
            <Text
              color="failure"
              fontSize="12px"
              textAlign="right"
              style={{ marginTop: '4px' }}
            >
              {errorMessage}
            </Text>
          )}
          <div className="flex justify-content-end align-items-center mt-2 mb-5">
            <Text textAlign="right" fontSize="12px" className="mr-1">
              Balance:
            </Text>
            {fetchBalanceStatus === FetchStatus.SUCCESS ? (
              <Text textAlign="right" fontSize="12px">
                {maxBalance.toString()}
              </Text>
            ) : (
              <Skeleton width="5rem" height="1rem" />
            )}
          </div>
          <Slider
            min={0}
            max={maxBalance}
            value={valueAsBn.lte(maxBalance) ? valueAsBn.toNumber() : 0}
            onChange={handleSliderChange}
            step={0.00001}
            disabled={!account || isTxPending}
            style={{ marginBottom: '16px' }}
          />
          <SimpleGrid columns={percentShortcuts.length}>
            {percentShortcuts.map(percent => {
              const handleClick = () => {
                setValue(
                  new BigNumber(((percent / 100) * maxBalance).toString())
                    .toFixed(DEHUB_DISPLAY_DECIMALS)
                    .toString()
                );
              };

              return (
                <Button
                  key={percent}
                  onClick={handleClick}
                  disabled={!account || isTxPending}
                  className="p-button-outlined text-white border-primary justify-content-center"
                >
                  {`${percent}%`}
                </Button>
              );
            })}
          </SimpleGrid>
          <div className="flex flex-row align-items-center gap-3">
            <Text textAlign="left" className="w-3">
              Period:
            </Text>
            <InputNumber
              value={period}
              onValueChange={handlePeriodChange}
              onChange={handlePeriodChange}
              showButtons
              className="w-full text-right"
              min={1}
            />
            <Text textAlign="right" className="w-2">
              days
            </Text>
          </div>
          <div className="flex justify-content-end align-items-center mt-2 mb-4">
            <Text textAlign="right" fontSize="12px" className="mr-1">
              Unlock date:
            </Text>
            <Text textAlign="right" fontSize="12px">
              {unlockDate.toLocaleString()}
            </Text>
          </div>
          <div className="overview-info text-left w-full mb-2">
            {account ? (
              <Button
                className="p-button w-full"
                disabled={!account || disableStake}
                onClick={handleEnterPosition}
                label="Stake"
                loading={isTxPending}
                loadingIcon={'pi pi-spin pi-spinner'}
              />
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default StakeModal;
