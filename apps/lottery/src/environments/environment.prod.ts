import { ChainId, defaultSharedProdEnv } from '@dehub/shared/config';
import { Env, defaultEnv } from './env';

export const environment: Env = {
  ...defaultSharedProdEnv,
  ...defaultEnv,

  baseUrl: '/lottery',

  chainId: ChainId.BSC_MAINNET,
};
