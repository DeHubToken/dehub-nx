import { DEHUB_DECIMALS } from '@dehub/shared/model';
import BigNumber from 'bignumber.js';
import { BIG_TEN } from './number.util';

export const getDecimalAmount = (
  amount: BigNumber,
  decimals = DEHUB_DECIMALS
) => new BigNumber(amount).times(BIG_TEN.pow(decimals));

export const getBalanceNumber = (
  balance: BigNumber,
  decimals = DEHUB_DECIMALS
) => getBalanceAmount(balance, decimals).toNumber();

export const getFullDisplayBalance = (
  balance: BigNumber,
  decimals = DEHUB_DECIMALS,
  displayDecimals?: number
) => {
  return getBalanceAmount(balance, decimals).toFixed(
    displayDecimals ?? 2,
    BigNumber.ROUND_DOWN
  );
};

export const getBalanceAmount = (
  amount: BigNumber | string,
  decimals = DEHUB_DECIMALS
) => new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));

export const formatNumber = (
  number: number,
  minPrecision = 2,
  maxPrecision = 2
) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};
