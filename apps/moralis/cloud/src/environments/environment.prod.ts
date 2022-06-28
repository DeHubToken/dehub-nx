import { defaultSharedProdEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  staking: {
    eventTables: {
      deposit: 'DeHubStakingDepositEvents',
      harvest: 'DeHubStakingHarvestEvents',
      withdraw: 'DeHubStakingWithdrawEvents',
    },
    deprecatedEventTables: {
      deposit: 'DeprecatedStakingDepositEvents',
      harvest: 'DeprecatedStakingHarvestEvents',
      withdraw: 'DeprecatedStakingWithdrawEvents',
    },
  },
  allrites: {
    clientId: '637f7235fdc05497aeba37ccffeed2b1',
    clientSecret: 'badac733900a8685d83954892b22c0cc',
  },
  shop: {
    eventTables: {
      purchase: 'ShopPurchaseEvents',
    },
  },
};
