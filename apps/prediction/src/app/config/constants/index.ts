import { ChainId, Constants, NetworkInfo } from '@dehub/shared/config';
import { environment } from '../../../environments/environment';

export const getChainId = (): ChainId => {
  return environment.chainId;
};

export const getChainIdHex = (): string => {
  return Constants[getChainId()].CHAIN_ID_HEX;
};

export const getNetworkInfo = (): NetworkInfo => {
  return Constants[getChainId()];
};

export const getRpcUrl = (): string => {
  return Constants[getChainId()].RPC_URL;
};
