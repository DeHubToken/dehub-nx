import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';

export type SerializedBigNumber = string;

export const BIG_ZERO = new BigNumber(0);
export const BIG_ONE = new BigNumber(1);
export const BIG_NINE = new BigNumber(9);
export const BIG_TEN = new BigNumber(10);

export const ethersToSerializedBigNumber = (
  ethersBn: EthersBigNumber
): SerializedBigNumber => ethersToBigNumber(ethersBn).toJSON();

export const ethersToBigNumber = (ethersBn: EthersBigNumber): BigNumber =>
  new BigNumber(ethersBn.toString());

/**
 * Round number with SI postfix.
 *
 * @param num the number to format
 * @param unitList K (Kilo), M (Million), etc.
 * @returns the SI formatted number like 5 K
 */
export const formatSIPostfix = (
  num: number,
  unitList = ['', 'K', 'M', 'B', 'T']
) => {
  let unit = 0;

  while (Math.abs(num) >= 1000) {
    num = Math.floor(Math.abs(num) / 100) / 10;
    unit++;
  }
  return `${Math.sign(num) * Math.abs(num)} ${unitList[unit]}`.trim();
};
