import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export type Env = SharedEnv;

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,

  dehub: {
    ...defaultSharedDevEnv.dehub,
    dapps: {
      ...defaultSharedDevEnv.dehub.dapps,
      staking: `${defaultSharedDevEnv.dehub.dapps.landing}/staking`,
    },
  },
};
