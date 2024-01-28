import { ChainId } from '@dehub/shared/model';

/**
 * Convert decimal number to hex.
 *
 * @param decimal the decimal number
 * @returns the hex number
 */
export const decimalToHex = (decimal: number) =>
  `0x${decimal.toString(16)}` as ChainId;
