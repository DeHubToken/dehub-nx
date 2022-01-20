import { AddressZero } from '@ethersproject/constants';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { isAddress } from './address.utils';

/**
 * Theme Switch key checker
 *
 * @param param0 keyboard event
 * @returns true if theme switch key combo was pressed
 */
export const isThemeSwitchKey = ({ code, shiftKey }: KeyboardEvent) =>
  shiftKey && code === 'IntlBackslash';

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
