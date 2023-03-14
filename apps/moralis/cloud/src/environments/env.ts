import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/model';

export interface Env extends SharedEnv {
  dappName: {
    bnbReward: string;
    token: string;
    staking: string;
    shop: string;
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
  shop: {
    eventTables: {
      purchase: 'ShopPurchaseEventsA',
    },
  },
};
