import { ChainId } from '@dehub/shared/config';
import { environment } from '../../../environments/environment';

export const TICKET_LIMIT_PER_REQUEST = 2500;

export const getChainId = (): ChainId => {
  return environment.chainId;
}