import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  deGrandStartDay: number;
  deGrandStartDayOnFebruary: number;
  contracts: {
    standardRaffle: string;
    specialRaffle: string;
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,
  deGrandStartDay: 26,
  deGrandStartDayOnFebruary: 25,
  contracts: {
    standardRaffle: '0xe5f4683dE66F20A8E1A2135f657aE97502E01e66',
    specialRaffle: '0xD17fB29e54f1CFeC6D56A9f46F69F24d4F5Feedb',
  },
};
