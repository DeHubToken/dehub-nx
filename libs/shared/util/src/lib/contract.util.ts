import { ContractsEnv, Currency } from '@dehub/shared/model';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { isAddress } from './address.util';
import { assertUnreachable } from './type-guard.util';

const getSigner = (library: Web3Provider, account: string): JsonRpcSigner =>
  library.getSigner(account).connectUnchecked();

const getProviderOrSigner = (
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner =>
  account ? getSigner(library, account) : library;

export const getContract = (
  address: string,
  abi: ContractInterface,
  library: Web3Provider,
  account?: string
): Contract => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, abi, getProviderOrSigner(library, account));
};

/**
 * Get the right contract address by currency
 */
export const getContractByCurrency = (
  currency: Currency,
  { dehubBsc, wbnb, busd, usdt }: ContractsEnv
) => {
  switch (currency) {
    case 'DeHub':
      return getAddress(dehubBsc);
    case 'BNB':
      return getAddress(wbnb);
    case 'BUSD':
      return getAddress(busd);
    case 'USDT':
      return getAddress(usdt);

    default:
      assertUnreachable(currency);
  }
};
