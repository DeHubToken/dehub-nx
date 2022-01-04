import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedDevEnv: SharedEnv = {
  ...defaultSharedEnv,

  contentful: {
    ...defaultSharedEnv.contentful,
    isPreview: true,
  },

  moralis: {
    appId: 'LQazohFSg15yR5ZtaRVqZQysUbzDI9olJjNKUrlE',
    serverUrl: 'https://3jucoi8srnps.moralisweb3.com:2053/server',
  },

  bscNodes: [
    'https://data-seed-prebsc-2-s3.binance.org:8545',
    'https://data-seed-prebsc-2-s3.binance.org:8545',
    'https://data-seed-prebsc-2-s3.binance.org:8545',
  ],
};
