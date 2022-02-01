import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  graphAPI: string;
  contracts: {
    prediction: string;
    chainLinkOracle: string;
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  graphAPI:
    'https://api.thegraph.com/subgraphs/name/sbvhev/prediction_dehub_test',

  contracts: {
    prediction: '0x805Ae00834D1D8fD3ba65784A335C42366b7ecfb',
    chainLinkOracle: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
  },
};
