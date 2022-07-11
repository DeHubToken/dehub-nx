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

export type ShopContractPropsType = ContractPropsType;
