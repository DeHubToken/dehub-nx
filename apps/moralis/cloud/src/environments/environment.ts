import { defaultEnv, Env } from './env';

export const environment: Env = {
  ...defaultEnv,

  staking: {
    eventTables: {
      deposit: 'StakingDepositEventsA',
      harvest: 'StakingHarvestEventsA',
      withdraw: 'StakingWithdrawEventsA',
    },
  },
};
