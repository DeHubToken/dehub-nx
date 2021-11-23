import { ChainId, Constants } from '@dehub/shared/config';
import { environment } from '../../../environments/environment';

export const getChainId = (): ChainId => {
  return environment.chainId;
};

export const getChainIdHex = (): string => {
  return Constants[getChainId()].CHAIN_ID_HEX;
};
