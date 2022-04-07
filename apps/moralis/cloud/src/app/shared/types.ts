export type ChainId =
  | 'eth'
  | '0x1'
  | 'ropsten'
  | '0x3'
  | 'rinkeby'
  | '0x4'
  | 'goerli'
  | '0x5'
  | 'kovan'
  | '0x2a'
  | 'polygon'
  | '0x89'
  | 'mumbai'
  | '0x13881'
  | 'bsc'
  | '0x38'
  | 'bsc testnet'
  | '0x61'
  | 'avalanche'
  | '0xa86a'
  | 'avalanche testnet'
  | '0xa869'
  | 'fantom'
  | '0xfa';

export type ChainIdAsNumber =
  | 1
  | 3
  | 4
  | 5
  | 42
  | 137
  | 80001
  | 56
  | 97
  | 43114
  | 43113
  | 250;

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
