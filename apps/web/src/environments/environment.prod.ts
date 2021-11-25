import { defaultSharedProdEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultSharedProdEnv,
  ...defaultEnv,

  baseUrl: '/web',
};
