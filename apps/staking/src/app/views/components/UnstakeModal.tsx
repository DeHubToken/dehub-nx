import { ConnectWalletButton, useWeb3Context } from '@dehub/react/core';
import { BalanceInput, Box, Text } from '@dehub/react/ui';
import { DEHUB_DECIMALS, DEHUB_DISPLAY_DECIMALS } from '@dehub/shared/config';
import {
  BIG_ZERO,
  getBalanceAmount,
  getDecimalAmount,
  getFullDisplayBalance,
} from '@dehub/shared/utils';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { Slider, SliderChangeParams } from 'primereact/slider';
import { Toast } from 'primereact/toast';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  useDehubContract,
  usePickStakingContract,
} from '../../hooks/useContract';
import {
  useFetchPool,
  usePool,
  useUserInfo,
} from '../../state/application/hooks';

interface UnstakeModalProps {
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

const UnstakeModal: React.FC<UnstakeModalProps> = ({ open, onHide }) => {
  const { account } = useWeb3Context();
  const dehubContract = useDehubContract();
  const stakingContract = usePickStakingContract();

  const { updatePool, updateUser } = useFetchPool();
  const { poolInfo } = usePool();
  const { userInfo } = useUserInfo();

  const [value, setValue] = useState<string>('');
  const [isTxPending, setIsTxPending] = useState(false);
  const [disableStake, setDisableStake] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toast = useRef<Toast>(null);

  const maxBalance = useMemo(
    () =>
      userInfo
        ? getBalanceAmount(userInfo.totalAmount, DEHUB_DECIMALS).toNumber()
        : BIG_ZERO.toNumber(),
    [userInfo]
  );

  const valueAsBn = new BigNumber(value);

  const showFieldWarning = !!account && errorMessage !== null;

  const handleChange = (input: string) => {
    setValue(input);
  };

  const handleSliderChange = (e: SliderChangeParams) => {
    setValue((e.value as number).toFixed(DEHUB_DISPLAY_DECIMALS).toString());
  };

  const handleEnterPosition = async () => {
    if (!dehubContract || !stakingContract) return;

    try {
      const decimalValue = getDecimalAmount(valueAsBn, DEHUB_DECIMALS);

      setIsTxPending(true);
      const tx = await stakingContract.unstake(
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
                {`${valueAsBn.toString()} $DeHub has been successfully unstaked!`}
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
        detail: `Unstaking failed - ${error?.data?.message ?? error.message}`,
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
        header={`Unstake Your Tokens`}
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
              <Text fontWeight={600}>{`Unstake:`}</Text>
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
          <div className="flex justify-content-end align-items-center mt-2">
            <Text textAlign="right" fontSize="12px" className="mr-1">
              Total staked:
            </Text>
            {userInfo ? (
              <Text textAlign="right" fontSize="12px">
                {getFullDisplayBalance(
                  userInfo.totalAmount,
                  DEHUB_DECIMALS,
                  DEHUB_DISPLAY_DECIMALS
                ).toString()}
              </Text>
            ) : (
              <Skeleton width="5rem" height="1rem" />
            )}
          </div>
          <div className="flex justify-content-end align-items-center mt-1 mb-5">
            <Text textAlign="right" fontSize="12px" className="mr-1">
              Returnable:
            </Text>
            {userInfo && poolInfo ? (
              <Text textAlign="right" fontSize="12px">
                {getFullDisplayBalance(
                  new Date().getTime() / 1000 > userInfo.unlockedAt
                    ? valueAsBn
                    : valueAsBn
                        .multipliedBy(10000 - poolInfo.forceUnstakeFee)
                        .dividedBy(10000),
                  0,
                  DEHUB_DISPLAY_DECIMALS
                ).toString()}
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
          <Text className="mb-4 text-pink-500 text-sm">
            Unstaking before the end of the staking period will incur{' '}
            <b>{Number(poolInfo?.forceUnstakeFee) / 100}%</b> fee. Are you sure
            you want to proceed?
          </Text>
          <div className="overview-info text-left w-full mb-2">
            {account ? (
              <Button
                className="p-button w-full"
                disabled={!account || disableStake}
                onClick={handleEnterPosition}
                label="Unstake"
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

export default UnstakeModal;
