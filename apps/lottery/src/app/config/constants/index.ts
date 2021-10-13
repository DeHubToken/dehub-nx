import { ChainId } from '@dehub/shared/config';
import { environment } from '../../../environments/environment';

export const TICKET_LIMIT_PER_REQUEST = 2500;
export const MAX_LOTTERIES_REQUEST_SIZE = 100;

export const getChainId = (): ChainId => {
  return environment.chainId;
}