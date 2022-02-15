import { ConnectWalletButton } from '@dehub/react/core';
import {
  ArrowBackIcon,
  AutoRenewIcon,
  BalanceInput,
  Box,
  Button,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from '@dehub/react/pcsuikit';
import { getDecimalAmount } from '@dehub/shared/utils';
import { MaxUint256 } from '@ethersproject/constants';
import BigNumber from 'bignumber.js';
import { Slider, SliderChangeParams } from 'primereact/slider';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { DEFAULT_TOKEN_DECIMAL } from '../../../../config';
import { useTranslation } from '../../../../contexts/Localization';
import { ContextData } from '../../../../contexts/Localization/types';
import {
  useDehubContract,
  usePredictionsContract,
} from '../../../../hooks/useContract';
import useToast from '../../../../hooks/useToast';
import { useGetDehubBalance } from '../../../../hooks/useTokenBalance';
import { useGetMinBetAmount } from '../../../../state/hooks';
import { BetPosition } from '../../../../state/types';
import { getPredictionsAddress } from '../../../../utils/addressHelpers';
import { getDehubAmount } from '../../helpers';
import useSwiper from '../../hooks/useSwiper';
import FlexRow from '../FlexRow';
import PositionTag from '../PositionTag';
import Card from './Card';

interface SetPositionCardProps {
  id: string;
  position: BetPosition;
  togglePosition: () => void;
  onBack: () => void;
  onSuccess: (decimalValue: BigNumber, hash: string) => Promise<void>;
}

const dust = new BigNumber(0.01).times(DEFAULT_TOKEN_DECIMAL);
const percentShortcuts = [10, 25, 50, 75];

const getButtonProps = (
  value: BigNumber,
  dehubBalance: BigNumber,
  minBetAmountBalance: number
) => {
  if (dehubBalance.eq(0)) {
    return { key: 'Insufficient DEHUB balance', disabled: true };
  }

  if (value.eq(0) || value.isNaN()) {
    return { key: 'Enter an amount', disabled: true };
  }
  return { key: 'Confirm', disabled: value.lt(minBetAmountBalance) };
};

const SetPositionCard: React.FC<SetPositionCardProps> = ({
  id,
  position,
  togglePosition,
  onBack,
  onSuccess,
}) => {
  const [value, setValue] = useState<string>('');
  const [isTxPending, setIsTxPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<{
    key?: string;
    data?: ContextData;
  } | null>(null);
  const { account } = useMoralis();
  const { swiper } = useSwiper();
  const dehubBalance = useGetDehubBalance();
  const minBetAmount = useGetMinBetAmount();
  const { t } = useTranslation();
  const { toastError } = useToast();
  const predictionsContract = usePredictionsContract();
  const betTokenContract = useDehubContract();
  const predictionContractAddress = getPredictionsAddress();

  const balanceDisplay = getDehubAmount(dehubBalance).toNumber();
  const maxBalance = getDehubAmount(
    dehubBalance.gt(dust) ? dehubBalance.minus(dust) : dehubBalance
  ).toNumber();
  const valueAsBn = new BigNumber(value);

  const showFieldWarning =
    !!account && valueAsBn.gt(0) && errorMessage !== null;
  const minBetAmountBalance = getDehubAmount(minBetAmount).toNumber();

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
    onBack();
  };

  // Disable the swiper events to avoid conflicts
  const handleMouseOver = () => {
    swiper?.keyboard.disable();
    swiper?.mousewheel.disable();
    swiper?.detachEvents();
  };

  const handleMouseOut = () => {
    swiper?.keyboard.enable();
    swiper?.mousewheel.enable();
    swiper?.attachEvents();
  };

  const { key, disabled } = getButtonProps(
    valueAsBn,
    dehubBalance,
    minBetAmountBalance
  );

  const handleEnterPosition = async () => {
    const betMethod = position === BetPosition.BULL ? 'betBull' : 'betBear';
    const decimalValue = getDecimalAmount(valueAsBn, 5);
    const allowance = await betTokenContract?.allowance(
      account,
      predictionContractAddress
    );

    try {
      if (betTokenContract && allowance < decimalValue.toNumber()) {
        const txApprove = await betTokenContract.approve(
          predictionContractAddress,
          MaxUint256
        );
        const receipt = await txApprove.wait();
        if (!receipt.status) {
          const errorMsg = t(
            'Please try again. Confirm the transaction and make sure you are paying enough gas!'
          );

          toastError(t('Error'), errorMsg);
          setIsTxPending(false);
          return;
        }
      }
      if (predictionsContract) {
        const tx = await predictionsContract[betMethod](
          decimalValue.toNumber()
        );
        setIsTxPending(true);
        const result = await tx.wait();
        setIsTxPending(false);
        onSuccess(decimalValue, result.transactionHash as string);
        window.localStorage.setItem(`bet_${id}_${account}`, 'DONE');
      } else {
        console.error('Predictions contract not set!');
      }
    } catch (error) {
      const errorMsg = t('An error occurred, unable to enter your position');

      if (error instanceof Error) toastError(t('Error'), error?.message);
      setIsTxPending(false);
      console.error(errorMsg, error);
    }
  };

  // Warnings
  useEffect(() => {
    const bnValue = new BigNumber(value);
    const hasSufficientBalance = bnValue.gt(0) && bnValue.lte(maxBalance);

    if (!hasSufficientBalance) {
      setErrorMessage({ key: 'Insufficient DEHUB balance' });
    } else if (bnValue.gt(0) && bnValue.lt(minBetAmountBalance)) {
      setErrorMessage({
        key: 'A minimum amount of %num% %token% is required',
        data: { num: minBetAmountBalance, token: 'DEHUB' },
      });
    } else {
      setErrorMessage(null);
    }
  }, [value, maxBalance, minBetAmountBalance, setErrorMessage]);

  return (
    <Card
      className="border-neon-1"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardHeader p="16px">
        <Flex alignItems="center">
          <IconButton variant="text" scale="sm" onClick={handleGoBack} mr="8px">
            <ArrowBackIcon width="24px" />
          </IconButton>
          <FlexRow>
            <Heading scale="md" style={{ margin: '0px' }}>
              {t('Set Position')}
            </Heading>
          </FlexRow>
          <PositionTag betPosition={position} onClick={togglePosition}>
            {position === BetPosition.BULL ? t('Up') : t('Down')}
          </PositionTag>
        </Flex>
      </CardHeader>
      <CardBody py="16px">
        <Flex alignItems="center" justifyContent="space-between" mb="8px">
          <Text textAlign="right" color="textSubtle">
            {t('Commit')}:
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
            {t(errorMessage?.key, errorMessage?.data)}
          </Text>
        )}
        <Text
          textAlign="right"
          mb="16px"
          color="textSubtle"
          fontSize="12px"
          style={{ height: '18px' }}
        >
          {account && t('Balance: %balance%', { balance: balanceDisplay })}
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
            {t('Max')}
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
              {t(key)}
            </Button>
          ) : (
            <ConnectWalletButton />
          )}
        </Box>
        <Text as="p" fontSize="12px" lineHeight={1} color="textSubtle">
          {t(
            'You won’t be able to remove or change your position once you enter it.'
          )}
        </Text>
      </CardBody>
    </Card>
  );
};

export default SetPositionCard;
