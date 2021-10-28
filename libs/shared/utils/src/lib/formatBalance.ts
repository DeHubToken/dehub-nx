import BigNumber from 'bignumber.js';
import { BIG_TEN } from './bigNumber';

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getFullDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
  displayDecimals?: number
) => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals ?? 2);
};

// Private

const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
};
