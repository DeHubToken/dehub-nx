import { ChainId } from '@dehub/shared/config';
import { environment } from '../../../environments/environment';

export const getChainId = (): ChainId => {
  return environment.chainId;
};
