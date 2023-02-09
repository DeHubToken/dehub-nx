import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  dappName: {
    bnbReward: string;
    token: string;
    staking: string;
    shop: string;
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
  shop: {
    eventTables: {
      purchase: string;
    };
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  dappName: {
    bnbReward: 'DeHubBNBRewardsDapp',
    token: 'DeHubTokenDapp',
    staking: 'DeHubStakingDapp',
    shop: 'DeHubShopDapp',
  },
  staking: {
    eventTables: {
      deposit: 'DeHubStakingDepositEvents',
      harvest: 'DeHubStakingHarvestEvents',
      withdraw: 'DeHubStakingWithdrawEvents',
    },
  },
  shop: {
    eventTables: {
      purchase: 'ShopPurchaseEventsA',
    },
  },
};
