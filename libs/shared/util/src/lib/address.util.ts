import { emptyRequiredField } from '@dehub/shared/config';
import { PhysicalAddress } from '@dehub/shared/model';
import { getAddress } from '@ethersproject/address';
import { isEqual } from 'lodash';

/**
 * Calculate the checksum address
 * @param value is the address
 * @returns checksum address if the address is valid, otherwise returns false
 */
export const isAddress = (value: string): string | false => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
};

/**
 * Shorten the checksum version
 * @param address the address
 * @param chars
 * @returns checksum version of the input address to have 0x + 4 characters at start and end
 */
export const shortenAddress = (address: string, chars = 4): string => {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
};

export const emptyPhysicalAddress = (): PhysicalAddress => ({
  name: emptyRequiredField,
  line1: emptyRequiredField,
  line2: emptyRequiredField,
  city: emptyRequiredField,
  country: emptyRequiredField,
  postalCode: emptyRequiredField,
  state: emptyRequiredField,
});

export const isEmptyPhysicalAddress = (physicalAddress?: PhysicalAddress) =>
  physicalAddress && isEqual(physicalAddress, emptyPhysicalAddress());
