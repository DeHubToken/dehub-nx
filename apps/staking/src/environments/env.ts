import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  contracts: {
    staking: string;
    rewards: string;
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  contracts: {
    staking: '0x0815ce2EDf97dF64182cF0fbf3bd2f52C273b1aF',
    rewards: '0x746a1Ea2AF87474B77038963E4e7eAb3bb5f8082',
  },
};
