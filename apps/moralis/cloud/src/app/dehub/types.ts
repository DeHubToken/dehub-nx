export enum SupportedNetwork {
  BSC_MAINNET = '0x38',
  BSC_TESTNET = '0x61',
}

export interface ContractPropsType {
  address: string; // contract address
  name: string; // contract name
  chainId: number;
  abi: string[];
}

export type DeHubTokenContractPropsType = ContractPropsType;

export interface StakingContractPropsType extends ContractPropsType {
  year: number;
  quarter: number;
}

export type StakingControllerContractPropsType = ContractPropsType;

export type RewardContractPropsType = ContractPropsType;
