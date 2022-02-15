import { formatNumber, getBalanceAmount } from '@dehub/shared/util';
import BigNumber from 'bignumber.js';
import { DefaultTheme } from 'styled-components';
import { Bet, BetPosition } from '../../state/types';
import getTimePeriods from '../../utils/getTimePeriods';

export const getDehubAmount = (dehubBn: BigNumber) => {
  return getBalanceAmount(dehubBn, 5);
};

export const formatUsd = (usd: number) => {
  return `$${formatNumber(usd || 0, 3, 3)}`;
};

export const formatDehub = (dehub?: number) => {
  return dehub
    ? dehub.toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })
    : '0';
};

export const padTime = (num: number) => num.toString().padStart(2, '0');

export const formatRoundTime = (secondsBetweenBlocks: number) => {
  const { hours, minutes, seconds } = getTimePeriods(secondsBetweenBlocks);
  const minutesSeconds = `${padTime(minutes)}:${padTime(seconds)}`;

  if (hours > 0) {
    return `${padTime(hours)}:${minutesSeconds}`;
  }

  return minutesSeconds;
};

export const getMultiplier = (total: number, amount: number) => {
  if (total === 0 || amount === 0) {
    return 0;
  }

  return total / amount;
};

/**
 * Calculates the total payout given a bet
 */
export const getPayout = (bet: Bet) => {
  if (!bet || !bet.round) {
    return 0;
  }

  const { bullAmount, bearAmount, totalAmount } = bet.round;
  const multiplier = getMultiplier(
    totalAmount as number,
    (bet.position === BetPosition.BULL ? bullAmount : bearAmount) as number
  );
  return bet.amount * multiplier;
};

// TODO: Move this to the UI Kit
export const getBubbleGumBackground = (theme: DefaultTheme) => {
  if (theme.isDark) {
    return 'linear-gradient(139.73deg, #2b5876 0%, #4e4376 100%)';
  }

  return 'linear-gradient(139.73deg, #E6FDFF 0%, #EFF4F5 46.87%, #F3EFFF 100%)';
};
