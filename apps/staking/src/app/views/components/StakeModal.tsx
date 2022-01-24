import { Hooks } from '@dehub/react/core';
import { DEHUB_DECIMALS } from '@dehub/shared/config';
import { getBalanceAmount, getDecimalAmount } from '@dehub/shared/utils';
import { MaxUint256 } from '@ethersproject/constants';
import BigNumber from 'bignumber.js';
import { capitalize } from 'lodash';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Slider, SliderChangeParams } from 'primereact/slider';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BalanceInput from '../../components/BalanceInput/BalanceInput';
import ConnectWalletButton from '../../components/ConnectWalletButton';
import { Box } from '../../components/Layout';
import { Text } from '../../components/Text';
import { DEFAULT_TOKEN_DECIMAL } from '../../config';
import { useDehubContract, useStakingContract } from '../../hooks/useContract';
import { useStakes } from '../../hooks/useStakes';
import { useGetDehubBalance } from '../../hooks/useTokenBalance';
import { getDehubAddress } from '../../utils/addressHelpers';

interface StakeModalProps {
  id: 'stake' | 'unstake';
  open: boolean;
  onHide: () => void;
}

const SimpleGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: 10px;
  margin-bottom: 16px;
`;

const dust = new BigNumber(0.01).times(DEFAULT_TOKEN_DECIMAL);
const percentShortcuts = [10, 25, 50, 75, 100];

const getPercentDisplay = (percentage: number) => {
  if (Number.isNaN(percentage)) {
    return '';
  }

  if (percentage > 100) {
    return '';
  }

  if (percentage < 0) {
    return '';
  }

  return `${percentage.toLocaleString(undefined, {
    maximumFractionDigits: 1,
  })}%`;
};

const getButtonProps = (value: BigNumber, dehubBalance: BigNumber) => {
  if (dehubBalance.eq(0)) {
    return { key: 'Insufficient DEHUB balance', disabled: true };
  }

  if (value.eq(0) || value.isNaN()) {
    return { key: 'Enter an amount', disabled: true };
  }
  return { key: 'Confirm', disabled: value.lt(0) };
};

const StakeModal: React.FC<StakeModalProps> = ({ id, open, onHide }) => {
  const [value, setValue] = useState<string>('');
  const [isTxPending, setIsTxPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { account } = Hooks.useMoralisEthers();
  const { userInfo: userStakeInfo } = useStakes(account);
  const dehubBalance = useGetDehubBalance();
  const stakingContract = useStakingContract();

  const toast = useRef<Toast>(null);

  const maxBalance = getBalanceAmount(
    id === 'stake'
      ? dehubBalance.gt(dust)
        ? dehubBalance.minus(dust)
        : dehubBalance
      : userStakeInfo.amount.gt(dust)
      ? userStakeInfo.amount.minus(dust)
      : userStakeInfo.amount,
    5
  ).toNumber();
  const valueAsBn = new BigNumber(value);

  const percentageOfMaxBalance = valueAsBn
    .div(maxBalance)
    .times(100)
    .toNumber();
  const percentageDisplay = getPercentDisplay(percentageOfMaxBalance);
  const dehubContractAddress = getDehubAddress();
  const dehubContract = useDehubContract();
  const showFieldWarning =
    !!account && valueAsBn.gt(0) && errorMessage !== null;
  const minBetAmountBalance = 0;

  const handleChange = (input: string) => {
    setValue(input);
  };

  const handleSliderChange = (e: SliderChangeParams) => {
    setValue(e.value.toString());
  };

  const setMax = () => {
    setValue(maxBalance.toString());
  };

  // Clear value
  const handleGoBack = () => {
    setValue('');
  };

  const { key, disabled } = getButtonProps(valueAsBn, dehubBalance);

  const handleEnterPosition = async () => {
    const decimalValue = getDecimalAmount(valueAsBn, DEHUB_DECIMALS);
    const allowance = await dehubContract?.allowance(
      account,
      dehubContractAddress
    );

    try {
      if (allowance < decimalValue.toNumber()) {
        const txApprove = await dehubContract?.approve(
          dehubContractAddress,
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
            life: 3000,
          });
          setIsTxPending(false);
          return;
        }
      }

      if (id === 'stake') {
        const tx = await stakingContract?.deposit(decimalValue.toNumber());
        setIsTxPending(true);
        await tx.wait();
        setIsTxPending(false);
      } else {
        const tx = await stakingContract?.withdraw(decimalValue.toNumber());
        setIsTxPending(true);
        await tx.wait();
        setIsTxPending(false);
      }

      toast?.current?.show({
        severity: 'success',
        summary: `Success`,
        detail: (
          <Box>
            <Text style={{ marginBottom: '8px' }}>
              {`${valueAsBn.toString()}$Dehub has been successfully ${id}!`}
            </Text>
          </Box>
        ),
        life: 3000,
      });
    } catch (error) {
      const errorMsg = 'An error occurred, unable to stake';
      if (error instanceof Error)
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: errorMsg,
          life: 3000,
        });
      console.error(error);
    }
  };

  // Warnings
  useEffect(() => {
    const bnValue = new BigNumber(value);
    const hasSufficientBalance = bnValue.gt(0) && bnValue.lte(maxBalance);

    if (!hasSufficientBalance) {
      setErrorMessage('Insufficient DEHUB balance');
    } else if (bnValue.gt(0) && bnValue.lt(minBetAmountBalance)) {
      setErrorMessage('A minimum amount of 0 DEHUB is required');
    } else {
      setErrorMessage(null);
    }
  }, [value, maxBalance, minBetAmountBalance, setErrorMessage]);

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="border-neon-1"
        header={`${capitalize(id)} In Pool`}
        onHide={onHide}
        style={{ minWidth: '288px', marginTop: '124px', position: 'relative' }}
      >
        <div className="flex flex-column">
          <div
            className="flex align-items-center justify-content-between"
            style={{ marginBottom: '8px' }}
          >
            <div className="flex align-items-center">
              <Text fontWeight={600}>{`${capitalize(id)}:`}</Text>
            </div>
            <div className="flex align-items-center">
              <Text fontWeight={600} textTransform="uppercase">
                DEHUB
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
          <div className="flex justify-content-end mt-2 mb-5">
            <Text textAlign="right" fontSize="12px">
              {account && `Balance: ${maxBalance}`}
            </Text>
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
                    .toFixed(5)
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
          <Box style={{ marginBottom: '8px' }}>
            {account ? (
              <Button
                disabled={!account || disabled}
                onClick={handleEnterPosition}
                icon={isTxPending ? 'pi pi-spin pi-spinner' : ''}
                iconPos="right"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {capitalize(id)}
              </Button>
            ) : (
              <ConnectWalletButton />
            )}
          </Box>
        </div>
      </Dialog>
    </>
  );
};

export default StakeModal;
