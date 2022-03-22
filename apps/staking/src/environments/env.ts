import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  contracts: {
    staking: string[];
    rewards: string;
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  contracts: {
    staking: [
      '0x1FB2EdfCFcAF5FDb8cb13B138c653De47F781163', // current
      '0xf5b76d6b076F8182b623D2947De7B558b73EDfC9', // past
      '0x6112eB935c848cbfFF2c15C768E57ec3AbD716d3', // coming
    ],
    rewards: '0x746a1Ea2AF87474B77038963E4e7eAb3bb5f8082',
  },
};
