import { ChainId, defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  chainId: number;
  deGrandStartDay: number;
  deGrandStartDayOnFebruary: number;
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  chainId: ChainId.BSC_TESTNET,
  deGrandStartDay: 26,
  deGrandStartDayOnFebruary: 25,
};
