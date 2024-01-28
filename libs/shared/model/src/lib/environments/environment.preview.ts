import { SharedEnv } from './env';
import { defaultSharedProdEnv } from './environment.prod';

export const inheritPreviewEnvFrom = (
  originEnv: SharedEnv = defaultSharedProdEnv
): SharedEnv => ({
  ...originEnv,
  env: 'preview',

  contentful: {
    ...originEnv.contentful,
    website: {
      ...originEnv.contentful.website,
      environmentId: 'preview',
    },
    isPreview: true,
  },
});
