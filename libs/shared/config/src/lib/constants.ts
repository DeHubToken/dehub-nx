export const DEHUB_DECIMALS = 5;
export const BUSD_DECIMALS = 18;

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
    Dehub: "",
    BNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    BUSD: "",
    StandardLottery: "",
    SpecialLottery: "",
    MultiCall: "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B",
  },
  [ChainId.BSC_TESTNET]: {
    Dehub: "0x5A5e32fE118E7c7b6536d143F446269123c0ba74",
    BNB: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    BUSD: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
    StandardLottery: "0xf73766cdF1F2F55aEA4e1F7B1Af2AA36a52c1f7D",
    SpecialLottery: "0x5Eb211A9F12b449a0e1625726F8a267846D8AE46",
    MultiCall: "0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576",
  },
}