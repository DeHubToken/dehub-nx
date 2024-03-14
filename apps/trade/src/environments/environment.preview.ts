import { inheritPreviewEnvFrom } from '@dehub/shared/model';
import { defaultEnv, Env } from './env';
import { environment as prodEnv } from './environment.prod';

export const environment: Env = {
  ...defaultEnv,
  ...inheritPreviewEnvFrom(prodEnv),

  dehub: {
    ...inheritPreviewEnvFrom(prodEnv).dehub,
    landing: 'https://preview.dehub.net/web',
  },

  // Preview should use Testnet
  web3: { ...defaultEnv.web3 },
};
