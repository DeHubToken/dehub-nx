import { ConnectWalletButton, useWeb3Context } from '@dehub/react/core';
import { BalanceInput, Box, Text } from '@dehub/react/ui';
import { DEHUB_DECIMALS, DEHUB_DISPLAY_DECIMALS } from '@dehub/shared/model';
import {
  BIG_ZERO,
  ethersToBigNumber,
  getBalanceAmount,
  getDecimalAmount,
  getFullDisplayBalance,
} from '@dehub/shared/utils';
import { Interface } from '@ethersproject/abi';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { ContractReceipt, Event } from '@ethersproject/contracts';
import { id } from '@ethersproject/hash';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {
  InputNumber,
  InputNumberValueChangeParams,
} from 'primereact/inputnumber';
import { Skeleton } from 'primereact/skeleton';
import { Slider, SliderChangeParams } from 'primereact/slider';
import { Toast, ToastMessageType } from 'primereact/toast';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { DAY_IN_SECONDS } from '../../config/constants';
import {
  useDehubContract,
  usePickStakingContract,
} from '../../hooks/useContract';
import {
  useFetchPool,
  usePool,
  useUserInfo,
} from '../../state/application/hooks';

interface RestakeModalProps {
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

const RestakeModal: React.FC<RestakeModalProps> = ({ open, onHide }) => {
  const { account } = useWeb3Context();
  const dehubContract = useDehubContract();
  const stakingContract = usePickStakingContract();

  const { updatePool, updateUser } = useFetchPool();
  const { poolInfo } = usePool();
  const { userInfo } = useUserInfo();

  const [value, setValue] = useState<string>('0.00');
  const [isTxPending, setIsTxPending] = useState(false);
  const [disableStake, setDisableStake] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [period, setPeriod] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [unlockDate, setUnlockDate] = useState(new Date());

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

  const restakeableAmount = useMemo(() => {
    if (!userInfo || !poolInfo) {
      return new BigNumber(0);
    }
    const unstakeAmount = userInfo.totalAmount
      .multipliedBy(10000 - poolInfo.forceUnstakeFee)
      .dividedBy(10000);
    return unstakeAmount;
  }, [userInfo, poolInfo]);

  const handleChange = (input: string) => {
    setValue(input);
  };

  const handleSliderChange = (e: SliderChangeParams) => {
    setValue((e.value as number).toFixed(DEHUB_DISPLAY_DECIMALS).toString());
  };

  const handlePeriodChange = (e: InputNumberValueChangeParams) => {
    const days = Number(e.value);
    setPeriod(days);
    const now = new Date().getTime() + days * count * DAY_IN_SECONDS * 1000;
    setUnlockDate(new Date(now));
  };

  const handleCountChange = (e: InputNumberValueChangeParams) => {
    const times = Number(e.value);
    setCount(times);
    const now = new Date().getTime() + period * times * DAY_IN_SECONDS * 1000;
    setUnlockDate(new Date(now));
  };

  const handleEnterPosition = async () => {
    if (!dehubContract || !stakingContract) return;

    try {
      const decimalValue = getDecimalAmount(valueAsBn, DEHUB_DECIMALS);

      const StakedTopic = id(
        'Staked(address,uint256,uint256,uint256,uint256,uint256)'
      );
      const RemainingTransferedTopic = id(
        'RemainingTransfered(address,uint256)'
      );
      const RestakedInterface = new Interface([
        'event Staked(address indexed user,uint256 period,uint256 amount,uint256 stakeAt,uint256 indexed rewardIndex,uint256 indexed tierIndex)',
        'event RemainingTransfered(address indexed user, uint256 transferAmount)',
      ]);

      setIsTxPending(true);
      const tx = await stakingContract['restakePortion'](
        EthersBigNumber.from(decimalValue.toString()),
        period * DAY_IN_SECONDS,
        count
      );
      await tx
        .wait()
        .then((receipt: ContractReceipt) => {
          updatePool();
          updateUser();

          const stakedEvents = receipt.events?.filter(
            (event: Event) => event.topics[0] === StakedTopic
          );
          const lastStakedEvent =
            stakedEvents && stakedEvents.length > 0
              ? stakedEvents.slice(-1)[0]
              : undefined;
          if (!lastStakedEvent) return;

          const remainingEvents = receipt.events?.filter(
            (event: Event) => event.topics[0] === RemainingTransferedTopic
          );
          const lastRemainingEvent =
            remainingEvents && remainingEvents.length > 0
              ? remainingEvents.slice(-1)[0]
              : undefined;

          const parsedStaked = RestakedInterface.parseLog(lastStakedEvent);
          const parsedRemaining = lastRemainingEvent
            ? RestakedInterface.parseLog(lastRemainingEvent)
            : undefined;

          const messages: ToastMessageType = [
            {
              severity: 'success',
              summary: `Success`,
              detail: (
                <Box>
                  <Text style={{ marginBottom: '8px' }}>
                    {`${getFullDisplayBalance(
                      ethersToBigNumber(parsedStaked.args['amount']),
                      DEHUB_DECIMALS,
                      DEHUB_DISPLAY_DECIMALS
                    )} $DeHub has been successfully restaked!`}
                  </Text>
                </Box>
              ),
              life: 4000,
            },
          ];
          if (parsedRemaining) {
            messages.push({
              severity: 'success',
              summary: `Success`,
              detail: (
                <Box>
                  <Text style={{ marginBottom: '8px' }}>
                    {`${getFullDisplayBalance(
                      ethersToBigNumber(parsedRemaining.args['transferAmount']),
                      DEHUB_DECIMALS,
                      DEHUB_DISPLAY_DECIMALS
                    )} $DeHub has been successfully refunded!`}
                  </Text>
                </Box>
              ),
              life: 4000,
            });
          }

          toast?.current?.show(messages);
        })
        .then(() => onHide());
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
        header={`Restake Your Tokens`}
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
              color="#ed4b9e"
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
              Restakeable:
            </Text>
            {userInfo && poolInfo ? (
              <Text textAlign="right" fontSize="12px">
                {getFullDisplayBalance(
                  restakeableAmount,
                  DEHUB_DECIMALS,
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
                    .toFixed(DEHUB_DISPLAY_DECIMALS, BigNumber.ROUND_DOWN)
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
              min={
                poolInfo ? Math.floor(poolInfo.minPeriod / DAY_IN_SECONDS) : 1
              }
              value={period}
              disabled={!account || isTxPending}
              onValueChange={handlePeriodChange}
              showButtons
              className="w-full text-right"
            />
            <Text textAlign="right" className="w-2">
              days
            </Text>
          </div>
          <div className="flex flex-row align-items-center gap-3 mt-2">
            <Text textAlign="left" className="w-3">
              Count:
            </Text>
            <InputNumber
              value={count}
              disabled={!account || isTxPending}
              onValueChange={handleCountChange}
              onChange={handleCountChange}
              showButtons
              className="w-full text-right"
              min={1}
            />
            <Text textAlign="right" className="w-2">
              times
            </Text>
          </div>
          <div className="flex justify-content-end align-items-center mt-2 mb-3">
            <Text textAlign="right" fontSize="12px" className="mr-1">
              Unlock date:
            </Text>
            <Text textAlign="right" fontSize="12px">
              {unlockDate.toLocaleString()}
            </Text>
          </div>
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
                label="Restake"
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

export default RestakeModal;
