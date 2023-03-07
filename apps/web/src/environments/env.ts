import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/model';

export type Env = SharedEnv;

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
};
