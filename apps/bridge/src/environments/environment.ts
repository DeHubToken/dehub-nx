import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  dehub: {
    ...defaultEnv.dehub,
    landing: 'http://dev.localhost:8301',
  },
};
