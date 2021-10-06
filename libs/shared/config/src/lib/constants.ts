export enum ChainId {
  BSC_MAINNET = 56,
  BSC_TESTNET = 97
}

export const SupportedChainId = [
  ChainId.BSC_MAINNET,
  ChainId.BSC_TESTNET
];

export interface NetworkInfo {
  MORALIS_ID: string;
  MORALIS_SERVER: string;
  CHAIN_ID_HEX: string;
  CHAIN_ID_DEC: number;
  RPC_URL: string;
}

export const Constants: { [key: number]: NetworkInfo } = {
  56: {
    MORALIS_ID: 'QfgYJskOXrYJnSAiB3KZPMMesmlJB6JBqY3GOzHV',
    MORALIS_SERVER: 'https://vamoxwojj7ht.moralisweb3.com:2053/server',
    CHAIN_ID_HEX: '0x38',
    CHAIN_ID_DEC: 56,
    RPC_URL:
      'https://speedy-nodes-nyc.moralis.io/a63582bee45a03699c0ca8fa/bsc/mainnet',
  },
  97: {
    MORALIS_ID: 'LQazohFSg15yR5ZtaRVqZQysUbzDI9olJjNKUrlE',
    MORALIS_SERVER: 'https://3jucoi8srnps.moralisweb3.com:2053/server',
    CHAIN_ID_HEX: '0x61',
    CHAIN_ID_DEC: 97,
    RPC_URL: 'https://data-seed-prebsc-2-s3.binance.org:8545/'
  }
}

export const ContractAddresses: { [chainId in ChainId]: { [label: string]: string } } = {
  [ChainId.BSC_MAINNET]: {
    StandardLottery: "",
    SpecialLottery: "",
  },
  [ChainId.BSC_TESTNET]: {
    StandardLottery: "",
    SpecialLottery: "",
  },
}