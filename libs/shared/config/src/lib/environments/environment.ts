import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedDevEnv: SharedEnv = {
  ...defaultSharedEnv,

  contentful: {
    ...defaultSharedEnv.contentful,
    isPreview: true,
  },
};
