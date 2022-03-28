import { SerializedBigNumber } from '@dehub/shared/util';
import BigNumber from 'bignumber.js';

export interface StakingContract {
  year: number;
  month: number;
  address: string; // contract address
  name: string; // contract name
  chainId: number;
  abi: string[];
}

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
