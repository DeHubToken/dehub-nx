import { inheritPreviewEnvFrom } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';
import { environment as prodEnv } from './environment.prod';

export const environment: Env = {
  ...defaultEnv,
  ...inheritPreviewEnvFrom(prodEnv),

  // Preview should use Testnet
  web3: { ...defaultEnv.web3 },
};
