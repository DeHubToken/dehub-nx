import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  dappName: {
    bnbReward: string;
    token: string;
    staking: string;
    ott: string;
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  dappName: {
    bnbReward: 'DeHubBNBRewardsDapp',
    token: 'DeHubTokenDapp',
    staking: 'DeHubStakingDapp',
    ott: 'DeHubOTTDapp',
  },
};
