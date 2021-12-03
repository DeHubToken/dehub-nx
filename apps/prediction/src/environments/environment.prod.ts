import { ChainId, defaultSharedProdEnv } from '@dehub/shared/config';
import { Env, defaultEnv } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/prediction',

  chainId: ChainId.BSC_MAINNET,
  graphAPI:
    'https://api.thegraph.com/subgraphs/name/dehubtoken/dehub-prediction',
};
