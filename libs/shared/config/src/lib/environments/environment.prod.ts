import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedProdEnv: SharedEnv = {
  ...defaultSharedEnv,
  env: 'prod',
  production: true,
};
