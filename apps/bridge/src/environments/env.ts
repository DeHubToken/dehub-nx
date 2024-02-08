import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/model';

export type Env = SharedEnv;

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,

  web3: {
    ...defaultSharedDevEnv.web3,
    auth: {
      ...defaultSharedDevEnv.web3.auth,
      walletConnectProjectId: '2fa20fc50239da14ddc410f769e4990d',
    },
  },
};
