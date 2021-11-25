import { ChainId, defaultSharedProdEnv } from '@dehub/shared/config';
import { Env, defaultEnv } from './env';

export const environment: Env = {
  ...defaultSharedProdEnv,
  ...defaultEnv,

  baseUrl: '/raffle',

  chainId: ChainId.BSC_MAINNET,
};
