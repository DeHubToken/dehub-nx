import { SharedEnv } from './env';
import { defaultSharedProdEnv } from './environment.prod';

export const inheritPreviewEnvFrom = (
  originEnv: SharedEnv = defaultSharedProdEnv
): SharedEnv => ({
  ...originEnv,
  env: 'preview',

  contentful: {
    ...originEnv.contentful,
    isPreview: true,
  },
});
