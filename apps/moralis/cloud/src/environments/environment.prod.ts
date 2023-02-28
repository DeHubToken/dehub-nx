import { defaultSharedProdEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  shop: {
    eventTables: {
      purchase: 'ShopPurchaseEvents',
    },
  },
};
