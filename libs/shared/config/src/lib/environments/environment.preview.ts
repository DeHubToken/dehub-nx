import { SharedEnv } from './env';
import { defaultSharedProdEnv } from './environment.prod';

export const defaultSharedPreviewEnv: SharedEnv = {
  ...defaultSharedProdEnv,
  env: 'preview',

  contentful: {
    ...defaultSharedProdEnv.contentful,
    isPreview: true,
  },
};
