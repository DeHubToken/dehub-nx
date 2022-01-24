import { SerializedBigNumber } from '@dehub/shared/utils';

export enum LoadingStatus {
  LOADING = 0,
  SYNCHRONIZING = 1,
  PAUSED = 2,
  COMPLETE = 3,
}

export interface PoolInfo {
  openTimeStamp: SerializedBigNumber;
  closeTimeStamp: SerializedBigNumber;
  emergencyPull: boolean;
  harvestFund: SerializedBigNumber;
  lastUpdateBlock: SerializedBigNumber;
  reflValuePerBlock: SerializedBigNumber;
  stakeValuePerBlock: SerializedBigNumber;
  totalStaked: SerializedBigNumber;
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}
