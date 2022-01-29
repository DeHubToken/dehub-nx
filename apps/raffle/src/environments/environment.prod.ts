import { defaultSharedProdEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/raffle',

  contracts: {
    standardRaffle: '0xF5A881B2c1Bc20DBE8E54674d65e8D66487da35e',
    specialRaffle: '0xdA9F2a546AfF5deDCF464205B229d18ab35B2d22',
  },
};
