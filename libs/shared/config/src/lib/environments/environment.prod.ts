import { defaultEnv, Env } from './env';

export const environmentProd: Env = {
  ...defaultEnv,
  env: 'prod',
  production: true,
};
