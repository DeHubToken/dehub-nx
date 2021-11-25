import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedDevEnv: SharedEnv = {
  ...defaultSharedEnv,
  env: 'dev',

  contentful: {
    ...defaultSharedEnv.contentful,
    isPreview: true,
  },
};
