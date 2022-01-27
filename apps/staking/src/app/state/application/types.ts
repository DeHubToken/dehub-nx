import { SerializedBigNumber } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';

export interface SerializedPoolInfo {
  openTimeStamp: number;
  closeTimeStamp: number;
  openBlock: number;
  closeBlock: number;
  emergencyPull: boolean;
  harvestFund: SerializedBigNumber;
  lastUpdateBlock: SerializedBigNumber;
  valuePerBlock: SerializedBigNumber;
  totalStaked: SerializedBigNumber;
}

export interface PoolInfo {
  openTimeStamp: number;
  closeTimeStamp: number;
  openBlock: number;
  closeBlock: number;
  emergencyPull: boolean;
  harvestFund: BigNumber;
  lastUpdateBlock: BigNumber;
  valuePerBlock: BigNumber;
  totalStaked: BigNumber;
}
