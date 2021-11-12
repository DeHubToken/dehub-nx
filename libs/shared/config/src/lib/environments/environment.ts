import { defaultEnv, Env } from './env';

export const environmentDev: Env = {
  ...defaultEnv,
  env: 'dev',

  contentful: {
    ...defaultEnv.contentful,
    isPreview: true,
  },
};
