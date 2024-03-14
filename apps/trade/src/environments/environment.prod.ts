import { defaultSharedProdEnv } from '@dehub/shared/model';
import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,
  ...defaultSharedProdEnv,

  baseUrl: '/trade',

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
  
  swap: {
    defaultInput: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // $USDT
    defaultOutput: '0x99BB69Ee1BbFC7706C3ebb79b21C5B698fe58EC0', // $DHB
    factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    initCodeHash:
      '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    slippage: 1400,
  },
};
