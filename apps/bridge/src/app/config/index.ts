import { BIG_TEN } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js/bignumber';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const BSC_BLOCK_TIME = 3;

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(5);
export const DEFAULT_GAS = 200000;
