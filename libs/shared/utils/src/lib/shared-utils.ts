import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

/**
 * Theme Switch key checker
 *
 * @param param0 keyboard event
 * @returns true if theme switch key combo was pressed
 */
export const isThemeSwitchKey = ({ code, shiftKey }: KeyboardEvent) =>
  shiftKey && code === 'IntlBackslash';

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

export const getSigner = (
  library: Web3Provider,
  account: string
): JsonRpcSigner => library.getSigner(account).connectUnchecked();

export const getProviderOrSigner = (
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner =>
  account ? getSigner(library, account) : library;

export const getContract = (
  address: string,
  ABI: ContractInterface,
  library: Web3Provider,
  account?: string
): Contract => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
};
