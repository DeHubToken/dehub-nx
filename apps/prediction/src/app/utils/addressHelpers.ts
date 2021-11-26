import addresses from '../config/constants/contracts';
import tokens from '../config/constants/tokens';
import { Address } from '../config/constants/types';

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56;
  const chainId = process.env.NX_REACT_APP_CHAIN_ID;
  return chainId
    ? address[chainId]
      ? address[chainId]
      : address[mainNetChainId]
    : address[mainNetChainId];
};

export const getCakeAddress = () => {
  return getAddress(tokens.cake.address);
};

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall);
};

export const getDehubAddress = () => {
  return getAddress(addresses.dehub);
};

export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions);
};
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle);
};
