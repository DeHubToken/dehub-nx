import React, { useEffect, useState } from 'react';
import { Slider, SliderChangeParams } from 'primereact/slider';
import BigNumber from 'bignumber.js';

import styled from 'styled-components';

import {
  Flex,
  Heading,
  Button,
  Text,
  BalanceInput,
  Box,
  AutoRenewIcon,
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalHeader,
  ModalCloseButton,
} from '@dehub/react/pcsuikit';
import { Hooks } from '@dehub/react/core';
import { getBalanceAmount } from '@dehub/shared/utils';

import { DEFAULT_TOKEN_DECIMAL } from '../../config';
import { useGetDehubBalance } from '../../hooks/useTokenBalance';
import ConnectWalletButton from '../../components/ConnectWalletButton';

interface StakeModalProps {
  id: string;
  onDismiss?: () => void;
}

const Modal = styled(ModalContainer)`
  overflow: visible;
`;

const dust = new BigNumber(0.01).times(DEFAULT_TOKEN_DECIMAL);
const percentShortcuts = [10, 25, 50, 75];

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

const StakeModal: React.FC<StakeModalProps> = ({ id, onDismiss }) => {
  const [value, setValue] = useState<string>('');
  const [isTxPending, setIsTxPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { account } = Hooks.useMoralisEthers();
  const dehubBalance = useGetDehubBalance();

  const balanceDisplay = getBalanceAmount(dehubBalance, 5).toNumber();
  const maxBalance = getBalanceAmount(
    dehubBalance.gt(dust) ? dehubBalance.minus(dust) : dehubBalance,
    5
  ).toNumber();
  const valueAsBn = new BigNumber(value);

  const percentageOfMaxBalance = valueAsBn
    .div(maxBalance)
    .times(100)
    .toNumber();
  const percentageDisplay = getPercentDisplay(percentageOfMaxBalance);
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
    if (onDismiss) {
      onDismiss();
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
    <Modal
      className="border-neon-1"
      minWidth="288px"
      position="relative"
      mt="124px"
    >
      <ModalHeader>
        <ModalTitle>
          <Heading style={{ margin: 0 }}>Stake</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody p="16px">
        <Flex alignItems="center" justifyContent="space-between" mb="8px">
          <Text textAlign="right" color="textSubtle">
            Commit:
          </Text>
          <Flex alignItems="center">
            <Text bold textTransform="uppercase">
              DEHUB
            </Text>
          </Flex>
        </Flex>
        <BalanceInput
          value={value}
          onUserInput={handleChange}
          isWarning={showFieldWarning}
          inputProps={{ disabled: !account || isTxPending }}
        />
        {showFieldWarning && (
          <Text color="failure" fontSize="12px" mt="4px" textAlign="right">
            {{ errorMessage }}
          </Text>
        )}
        <Text
          textAlign="right"
          mb="16px"
          color="textSubtle"
          fontSize="12px"
          style={{ height: '18px' }}
        >
          {account && `Balance: ${balanceDisplay}`}
        </Text>
        <Slider
          min={0}
          max={maxBalance}
          value={valueAsBn.lte(maxBalance) ? valueAsBn.toNumber() : 0}
          onChange={handleSliderChange}
          step={0.00001}
          disabled={!account || isTxPending}
          style={{ marginBottom: '16px' }}
        />
        <Flex alignItems="center" justifyContent="space-between" mb="16px">
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
                scale="xs"
                mx="4px"
                variant="tertiary"
                onClick={handleClick}
                disabled={!account || isTxPending}
                style={{ flex: 1 }}
              >
                {`${percent}%`}
              </Button>
            );
          })}
          <Button
            scale="xs"
            variant="tertiary"
            onClick={setMax}
            disabled={!account || isTxPending}
          >
            Max
          </Button>
        </Flex>
        <Box mb="8px">
          {account ? (
            <Button
              width="100%"
              disabled={!account || disabled}
              onClick={handleEnterPosition}
              isLoading={isTxPending}
              endIcon={
                isTxPending ? <AutoRenewIcon color="currentColor" spin /> : null
              }
            >
              {{ key }}
            </Button>
          ) : (
            <ConnectWalletButton />
          )}
        </Box>
        <Text as="p" fontSize="12px" lineHeight={1} color="textSubtle">
          You won’t be able to remove or change your position once you enter it.
        </Text>
      </ModalBody>
    </Modal>
  );
};

export default StakeModal;
