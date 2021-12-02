import {
  ChainId,
  defaultSharedEnv as sharedDefaultEnv,
  SharedEnv,
} from '@dehub/shared/config';

export interface Env extends SharedEnv {
  chainId: number;
}

export const defaultEnv: Env = {
  ...sharedDefaultEnv,
  chainId: ChainId.BSC_TESTNET,
};
