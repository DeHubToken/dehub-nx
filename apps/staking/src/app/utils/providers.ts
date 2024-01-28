import { getRandomRpcUrlByChainId } from '@dehub/shared/utils';
import { JsonRpcProvider } from '@ethersproject/providers';
import { environment } from '../../environments/environment';

export const simpleRpcProvider = new JsonRpcProvider(
  getRandomRpcUrlByChainId(environment.web3.chainId)
);
