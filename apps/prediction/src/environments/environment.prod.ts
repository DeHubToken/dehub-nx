import { defaultSharedProdEnv } from '@dehub/shared/config';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/prediction',

  graphAPI:
    'https://api.thegraph.com/subgraphs/name/dehubtoken/dehub-prediction',

  contracts: {
    prediction: '0xF73bee744210292973A51B1Cc4ef535519757dCc',
    chainLinkOracle: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
  },
};
