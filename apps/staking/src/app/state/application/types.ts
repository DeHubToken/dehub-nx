import { SerializedBigNumber } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';

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
}

export interface PoolPaused {
  paused: boolean;
}

export type PoolInfoAndPaused = PoolInfo & PoolPaused;

export interface UserInfo {
  totalAmount: BigNumber;
  unlockedAt: number;
  harvestTotal: BigNumber;
  harvestClaimed: BigNumber;
}

export interface SerializedUserInfo {
  totalAmount: SerializedBigNumber;
  unlockedAt: number;
  harvestTotal: SerializedBigNumber;
  harvestClaimed: SerializedBigNumber;
}

export interface ApplicationState {
  applicationStatus: ApplicationStatus;
  dehubPrice: SerializedBigNumber;
  poolInfo: PoolInfoAndPaused | undefined;
  poolInfoLoading: boolean;
  userInfo: SerializedUserInfo | undefined;
  userInfoLoading: boolean;
  readonly blockNumber: { readonly [chainId: number]: number };
}
