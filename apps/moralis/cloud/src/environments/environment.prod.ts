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
  shop: {
    eventTables: {
      purchase: 'ShopPurchaseEvents',
    },
  },
};
