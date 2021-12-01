import { ChainId, defaultSharedProdEnv } from '@dehub/shared/config';
import { Env, defaultEnv } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/raffle',

  chainId: ChainId.BSC_MAINNET,
};
