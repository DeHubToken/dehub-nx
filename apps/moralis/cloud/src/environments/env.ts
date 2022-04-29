import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  dappName: {
    bnbReward: string;
    token: string;
    staking: string;
    ott: string;
  };
  staking: {
    eventTables: {
      deposit: string;
      harvest: string;
      withdraw: string;
    };
    deprecatedEventTables?: {
      deposit: string;
      harvest: string;
      withdraw: string;
    };
  };
  allrites: {
    clientId: string;
    clientSecret: string;
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
  staking: {
    eventTables: {
      deposit: 'DeHubStakingDepositEvents',
      harvest: 'DeHubStakingHarvestEvents',
      withdraw: 'DeHubStakingWithdrawEvents',
    },
  },
  allrites: {
    clientId: '637f7235fdc05497aeba37ccffeed2b1',
    clientSecret: 'badac733900a8685d83954892b22c0cc',
  },
};
