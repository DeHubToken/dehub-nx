import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedProdEnv: SharedEnv = {
  ...defaultSharedEnv,
  env: 'prod',
  production: true,

  // DeHub Prod
  moralis: {
    appId: 'QfgYJskOXrYJnSAiB3KZPMMesmlJB6JBqY3GOzHV',
    serverUrl: 'https://vamoxwojj7ht.moralisweb3.com:2053/server',
  },

  web3: {
    ...defaultSharedEnv.web3,
    chainId: 56,
    addresses: {
      contracts: {
        dehub: '0xFC206f429d55c71cb7294EfF40c6ADb20dC21508',
        dehubBnb: '0xE876eE0945CE80Ef821633f2C18950b33Fb85633',
        bnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        bnbBusd: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
        busd: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        multiCall: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
      },
    },
    fortmatic: 'pk_live_3A6FAF91DA1D46C5',
    auth: {
      magicLinkApiKey: 'pk_live_A3DB34BA3F84FB3B',
    },
  },
};
