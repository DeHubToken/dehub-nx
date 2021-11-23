import { ChainId, Constants, NetworkInfo } from '@dehub/shared/config';
import { environment } from '../../../environments/environment';

export const TICKET_LIMIT_PER_REQUEST = 2500;
export const MAX_DELOTTO_REQUEST_SIZE = 100;
export const MAX_DEGRAND_REQUEST_SIZE = 10;

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

export const getBaseUrl = (): string => {
  return environment.production ? '/lottery' : '';
};
