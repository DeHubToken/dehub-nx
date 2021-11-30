import { ContractAddresses } from '@dehub/shared/config';
import { getChainId } from '../config/constants';

export const getAddress = (label: string): string => {
  const chainId = getChainId();
  return ContractAddresses[chainId][label];
};

export const getMulticallAddress = () => {
  return getAddress('MultiCall');
};

export const getDehubAddress = () => {
  return getAddress('DeHub');
};

export const getPredictionsAddress = () => {
  return getAddress('Prediction');
};
export const getChainlinkOracleAddress = () => {
  return getAddress('ChainLinkOracle');
};
