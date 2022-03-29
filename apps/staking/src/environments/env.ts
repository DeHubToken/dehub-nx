import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  contracts: {
    rewards: string;
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  contracts: {
    rewards: '0x2e5F23FD566b0793434971396d2C0B2deaf90c77', // reward v5
  },
};
