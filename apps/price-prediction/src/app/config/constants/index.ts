import { ChainId, Constants, NetworkInfo } from '@dehub/shared/config';

export { default as farmsConfig } from './farms';
export { default as poolsConfig } from './pools';
export { default as ifosConfig } from './ifo';

import { environment } from '../../../environments/environment';

export const TICKET_LIMIT_PER_REQUEST = 2500;
export const MAX_DELOTTO_REQUEST_SIZE = 100;
export const MAX_DEGRAND_REQUEST_SIZE = 10;

export const getChainId = (): ChainId => {
  return environment.chainId;
};
