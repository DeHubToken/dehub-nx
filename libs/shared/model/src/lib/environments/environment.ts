import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedDevEnv: SharedEnv = {
  ...defaultSharedEnv,

  contentful: {
    ...defaultSharedEnv.contentful,
    website: {
      ...defaultSharedEnv.contentful.website,
      environmentId: 'dev',
    },
    isPreview: true,
  },
};
