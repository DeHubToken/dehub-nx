import { defaultSharedDevEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultSharedDevEnv,
  ...defaultEnv,
};
