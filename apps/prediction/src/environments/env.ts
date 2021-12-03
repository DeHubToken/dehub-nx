import { ChainId, defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  chainId: number;
  graphAPI: string;
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  chainId: ChainId.BSC_TESTNET,
  graphAPI:
    'https://api.thegraph.com/subgraphs/name/sbvhev/prediction_dehub_test',
};
