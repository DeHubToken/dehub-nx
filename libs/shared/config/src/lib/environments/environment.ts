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
          'https://data-seed-prebsc-2-s3.binance.org:8545',
          'https://data-seed-prebsc-2-s3.binance.org:8545',
          'https://data-seed-prebsc-2-s3.binance.org:8545',
        ],
      },
    },
  },
};
