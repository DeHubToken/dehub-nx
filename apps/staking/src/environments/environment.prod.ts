import { defaultSharedProdEnv } from '@dehub/shared/model';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/staking',

  dehub: {
    ...defaultSharedProdEnv.dehub,
    landing: 'https://dehub.net/web',
  },

  web3: {
    ...defaultSharedProdEnv.web3,
    auth: {
      ...defaultSharedProdEnv.web3.auth,
      walletConnectProjectId: '861c0042b87e8b95628c7be58ebdbb01',
    },
  },
};
