export const DEHUB_DECIMALS = 5;
export const BUSD_DECIMALS = 18;

export enum ChainId {
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
}

export const SupportedChainId = [ChainId.BSC_MAINNET, ChainId.BSC_TESTNET];

interface NativeCurrencyInfo {
  name: string;
  symbol: string;
  decimals: number;
}

export interface NetworkInfo {
  MORALIS_ID: string;
  MORALIS_SERVER: string;
  CHAIN_ID_HEX: string;
  CHAIN_ID_DEC: number;
  CHAIN_NAME: string;
  NATIVE_CURRENCY: NativeCurrencyInfo;
  RPC_URL: string;
  BLOCK_EXPLORER_URLS: string;
}

export const Constants: { [key: number]: NetworkInfo } = {
  56: {
    MORALIS_ID: 'QfgYJskOXrYJnSAiB3KZPMMesmlJB6JBqY3GOzHV',
    MORALIS_SERVER: 'https://vamoxwojj7ht.moralisweb3.com:2053/server',
    CHAIN_ID_HEX: '0x38',
    CHAIN_ID_DEC: 56,
    CHAIN_NAME: 'Binance Smart Chain Mainnet',
    NATIVE_CURRENCY: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    RPC_URL: 'https://bsc-dataseed.binance.org/',
    BLOCK_EXPLORER_URLS: 'https://bscscan.com',
  },
  97: {
    MORALIS_ID: 'LQazohFSg15yR5ZtaRVqZQysUbzDI9olJjNKUrlE',
    MORALIS_SERVER: 'https://3jucoi8srnps.moralisweb3.com:2053/server',
    CHAIN_ID_HEX: '0x61',
    CHAIN_ID_DEC: 97,
    CHAIN_NAME: 'Binance Smart Chain Testnet',
    NATIVE_CURRENCY: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    BLOCK_EXPLORER_URLS: 'https://testnet.bscscan.com',
  },
};

export const ContractAddresses: {
  [chainId in ChainId]: { [label: string]: string };
} = {
  [ChainId.BSC_MAINNET]: {
    Dehub: '',
    BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    BUSD: '',
    StandardLottery: '',
    SpecialLottery: '',
    MultiCall: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
  },
  [ChainId.BSC_TESTNET]: {
    Dehub: '0x5A5e32fE118E7c7b6536d143F446269123c0ba74',
    BNB: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    BUSD: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
    StandardLottery: '0x34fa1042e8d507742EbC5fD7b9a81943Df206612',
    SpecialLottery: '0x030C4e201D9D6a3575d0319c5d0b7e9fdEa628d6',
    MultiCall: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
  },
};
