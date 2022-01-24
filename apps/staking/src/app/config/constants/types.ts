import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';

export enum LoadingStatus {
  LOADING = 0,
  SYNCHRONIZING = 1,
  PAUSED = 2,
  COMPLETE = 3,
}

export interface PoolInfo {
  openTimeStamp: EthersBigNumber;
  closeTimeStamp: EthersBigNumber;
  emergencyPull: boolean;
  harvestFund: EthersBigNumber;
  lastUpdateBlock: EthersBigNumber;
  reflValuePerBlock: EthersBigNumber;
  stakeValuePerBlock: EthersBigNumber;
  totalStaked: EthersBigNumber;
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}
