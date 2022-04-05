import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  foo: string;
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  foo: 'bar',
};
