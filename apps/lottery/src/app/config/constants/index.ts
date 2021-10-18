import { ChainId } from '@dehub/shared/config';
import { environment } from '../../../environments/environment';

export const TICKET_LIMIT_PER_REQUEST = 2500;
export const MAX_DELOTTO_REQUEST_SIZE = 100;
export const MAX_DEGRAND_REQUEST_SIZE = 10;

export const getChainId = (): ChainId => {
  return environment.chainId;
}