import { defaultSharedPreviewEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedPreviewEnv,

  baseUrl: '/web',
};
