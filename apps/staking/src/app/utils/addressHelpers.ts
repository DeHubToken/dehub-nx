import { ContractAddresses } from '@dehub/shared/config';
import { getChainId } from '../config/constants';

export const getAddress = (label: string): string => {
  const chainId = getChainId();
  return ContractAddresses[chainId][label];
};

export const getMultiCallAddress = (): string => {
  return getAddress('MultiCall');
};

export const getDehubAddress = (): string => {
  return getAddress('DeHub');
};
