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
};
