import { defaultSharedProdEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/buy',

  swap: {
    defaultInput: 'BNB',
    defaultOutput: '0xFC206f429d55c71cb7294EfF40c6ADb20dC21508',
    factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    initCodeHash:
      '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
  },
};
