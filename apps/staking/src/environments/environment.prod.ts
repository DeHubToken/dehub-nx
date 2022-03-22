import { defaultSharedProdEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/staking',

  contracts: {
    staking: ['0xDAa49168FEC0147c922b7Cf401aBCd5914f7af9c'],
    rewards: '0x30E2181EDb3F38Fe00Cf242561875Df1ab617E6c',
  },
};
