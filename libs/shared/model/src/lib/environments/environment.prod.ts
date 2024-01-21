import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedProdEnv: SharedEnv = {
  ...defaultSharedEnv,
  env: 'prod',
  production: true,

  web3: {
    ...defaultSharedEnv.web3,
    // DeHub Prod
    moralis: {
      appId: 'QfgYJskOXrYJnSAiB3KZPMMesmlJB6JBqY3GOzHV',
      serverUrl: 'https://vamoxwojj7ht.moralisweb3.com:2053/server',
    },
    chainId: 56,
    addresses: {
      contracts: {
        dehubBsc: '0x680D3113caf77B61b510f332D5Ef4cf5b41A761D',
        dehubEth: '0x99BB69Ee1BbFC7706C3ebb79b21C5B698fe58EC0',
        dehubPolygon: '0x6051e59eb50BB568415B6C476Fbd394EEF83834D',
        dehubBnb: '0xE876eE0945CE80Ef821633f2C18950b33Fb85633',
        wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        bnbBusd: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
        busd: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        usdt: '0x55d398326f99059fF775485246999027B3197955',
        multiCall: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
        staking: '0x26d2Cd7763106FDcE443faDD36163E2ad33A76E6',
      },
    },
    auth: {
      magicLinkApiKey: 'pk_live_A3DB34BA3F84FB3B',
      walletConnectProjectId: 'b81c35555879db44a7b2b6392838dcbe',
    },
  },

  emails: {
    ...defaultSharedEnv.emails,
    shopSupport: 'tech@dehub.net', // TODO: change to prod email
  },
};
