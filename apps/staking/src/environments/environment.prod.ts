import { defaultSharedProdEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/staking',

  contracts: {
    staking: '', // TODO: needs to specify
    rewards: '', // TODO: needs to specify
  },
};
