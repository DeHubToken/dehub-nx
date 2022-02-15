import { getAddress } from '@ethersproject/address';

/**
 * Calculate the checksummed address
 * @param value is the address
 * @returns checksummed address if the address is valid, otherwise returns false
 */
export const isAddress = (value: string): string | false => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
};

/**
 * Shorten the checksummed version
 * @param address the address
 * @param chars
 * @returns checksummed version of the input address to have 0x + 4 characters at start and end
 */
export const shortenAddress = (address: string, chars = 4): string => {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
};
