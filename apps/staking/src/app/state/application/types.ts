import { SerializedBigNumber } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';

export interface SerializedPoolInfo {
  openTimeStamp: number;
  closeTimeStamp: number;
  emergencyPull: boolean;
  harvestFund: SerializedBigNumber;
  lastUpdateBlock: SerializedBigNumber;
  reflValuePerBlock: SerializedBigNumber;
  stakeValuePerBlock: SerializedBigNumber;
  totalStaked: SerializedBigNumber;
}

export interface PoolInfo {
  openTimeStamp: number;
  closeTimeStamp: number;
  emergencyPull: boolean;
  harvestFund: BigNumber;
  lastUpdateBlock: BigNumber;
  reflValuePerBlock: BigNumber;
  stakeValuePerBlock: BigNumber;
  totalStaked: BigNumber;
}
