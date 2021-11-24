import { defaultSharedEnv, SharedEnv } from '@dehub/shared/config';

export type Env = SharedEnv;

export const defaultEnv: Env = {
  ...defaultSharedEnv,
};
