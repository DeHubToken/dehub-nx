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

export interface ApplicationState {
  applicationStatus: ApplicationStatus;
  walletConnectingState: WalletConnectingState;
  dehubPrice: SerializedBigNumber;
  stakingContracts: StakingContractProperties[] | null;
  stakingController: ContractProperties | null;
  pools: SerializedPoolInfo[];
  readonly blockNumber: { readonly [chainId: string]: number };
}
