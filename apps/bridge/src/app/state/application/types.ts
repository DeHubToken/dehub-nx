import { SerializedBigNumber } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';
import { ChainType } from '../../constants/chains';

export enum ApplicationStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error',
}

export interface PoolInfo {
  stakingStartAt: number;
  tierPeriods: number[];
  tierPercents: number[];
  rewardPeriod: number;
  lastRewardIndex: number;
  forceUnstakeFee: number;
  minPeriod: number;
  totalStaked: BigNumber;
  totalStakers: number;
}

export interface PoolPaused {
  paused: boolean;
}

export type PoolInfoAndPaused = PoolInfo & PoolPaused;

export interface SerializedPoolInfo {
  stakingStartAt: number;
  tierPeriods: number[];
  tierPercents: number[];
  rewardPeriod: number;
  lastRewardIndex: number;
  forceUnstakeFee: number;
  minPeriod: number;
  totalStaked: SerializedBigNumber;
  totalStakers: number;
}

export type SerializedPoolInfoAndPaused = SerializedPoolInfo & PoolPaused;

export interface UserInfo {
  totalAmount: BigNumber;
  stakingShares: number;
  unlockedAt: number;
  lastTierIndex: number;
  pendingHarvest: BigNumber;
  stakedAt: number;
}

export interface SerializedUserInfo {
  totalAmount: SerializedBigNumber;
  stakingShares: number;
  unlockedAt: number;
  lastTierIndex: number;
  pendingHarvest: SerializedBigNumber;
  stakedAt: number;
}

export interface ApplicationState {
  updateState: boolean,
  tokenAmount: string,
  sourceChain: ChainType | null;
  dstChain: ChainType | null;
  applicationStatus: ApplicationStatus;
  dehubPrice: SerializedBigNumber;
  poolInfo: SerializedPoolInfoAndPaused | undefined;
  poolInfoLoading: boolean;
  userInfo: SerializedUserInfo | undefined;
  userInfoLoading: boolean;
  readonly blockNumber: { readonly [chainId: number]: number };
}
