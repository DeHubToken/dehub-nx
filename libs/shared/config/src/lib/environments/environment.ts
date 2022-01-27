import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedDevEnv: SharedEnv = {
  ...defaultSharedEnv,

  contentful: {
    ...defaultSharedEnv.contentful,
    isPreview: true,
  },

  moralis: {
    appId: 'DFudauPsoiAhop4Bl8gXEkF54nVQTfHxeteeB5hD',
    serverUrl: 'https://xts3kxiqgzqj.usemoralis.com:2053/server',
  },

  web3: {
    ...defaultSharedEnv.web3,
    networks: {
      bsc: {
        ...defaultSharedEnv.web3.networks.bsc,
        nodes: [
          'https://speedy-nodes-nyc.moralis.io/6b2569937eb2e5cb5996d2dc/bsc/testnet',
          'https://speedy-nodes-nyc.moralis.io/6b2569937eb2e5cb5996d2dc/bsc/testnet',
          'https://speedy-nodes-nyc.moralis.io/6b2569937eb2e5cb5996d2dc/bsc/testnet',
        ],
      },
    },
  },
};
