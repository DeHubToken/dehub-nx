import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedDevEnv: SharedEnv = {
  ...defaultSharedEnv,

  contentful: {
    ...defaultSharedEnv.contentful,
    isPreview: true,
  },

  moralis: {
    id: 'DFudauPsoiAhop4Bl8gXEkF54nVQTfHxeteeB5hD',
    server: 'https://xts3kxiqgzqj.usemoralis.com:2053/server',
  },

  bscNodes: [
    'https://data-seed-prebsc-2-s3.binance.org:8545',
    'https://data-seed-prebsc-2-s3.binance.org:8545',
    'https://data-seed-prebsc-2-s3.binance.org:8545',
  ],
};
