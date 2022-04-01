import { WalletConnectingState } from '@dehub/shared/model';
import { SerializedBigNumber } from '@dehub/shared/util';
import BigNumber from 'bignumber.js';

export enum ApplicationStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error',
}

export interface ContractProperties {
  address: string; // contract address
  name: string; // contract name
  chainId: number;
  abi: string[];
}

export interface StakingContractProperties extends ContractProperties {
  year: number;
  month: number;
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

export interface PoolPaused {
  paused: boolean;
}

export type SerializedPoolInfoPaused = SerializedPoolInfo & PoolPaused;

export type PoolInfoAndPaused = PoolInfo & PoolPaused;

export interface SerializedUserInfo {
  amount: SerializedBigNumber;
  reflectionDebt: SerializedBigNumber;
  reflectionPending: SerializedBigNumber;
  harvestDebt: SerializedBigNumber;
  harvestPending: SerializedBigNumber;
  harvested: boolean;
}

export interface SerializedUserPendingHarvest {
  pendingHarvest: SerializedBigNumber;
}

export type SerializedPoolUserInfo = SerializedUserInfo &
  SerializedUserPendingHarvest;

export interface UserInfo {
  amount: BigNumber;
  reflectionDebt: BigNumber;
  reflectionPending: BigNumber;
  harvestDebt: BigNumber;
  harvestPending: BigNumber;
  harvested: boolean;
}

export type PoolUserInfo = UserInfo & {
  pendingHarvest: BigNumber;
};

export interface ApplicationState {
  applicationStatus: ApplicationStatus;
  walletConnectingState: WalletConnectingState;
  dehubPrice: SerializedBigNumber;
  stakingContracts: StakingContractProperties[] | null;
  stakingController: ContractProperties | null;
  pools: SerializedPoolInfoPaused[];
  poolsLoading: boolean;
  userInfos: SerializedPoolUserInfo[];
  userInfosLoading: boolean;
  pendingHarvestLoading: boolean;
  readonly blockNumber: { readonly [chainId: string]: number };
}
