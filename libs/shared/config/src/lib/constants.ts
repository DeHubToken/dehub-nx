export const DEHUB_DECIMALS = 5;
export const BUSD_DECIMALS = 18;

export const BUSD_DISPLAY_DECIMALS = 2;

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
    RPC_URL: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
    BLOCK_EXPLORER_URLS: 'https://testnet.bscscan.com',
  },
};

export const ContractAddresses: {
  [chainId in ChainId]: { [label: string]: string };
} = {
  [ChainId.BSC_MAINNET]: {
    DeHub: '0xFC206f429d55c71cb7294EfF40c6ADb20dC21508',
    BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    'DeHub-BNB': '0xE876eE0945CE80Ef821633f2C18950b33Fb85633',
    'BNB-BUSD': '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    StandardLottery: '0xF5A881B2c1Bc20DBE8E54674d65e8D66487da35e',
    SpecialLottery: '0xdA9F2a546AfF5deDCF464205B229d18ab35B2d22',
    Prediction: '0x05f3c9928df942e734bbb5b8027b063f8f308b48',
    ChainLinkOracle: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
    MultiCall: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
  },
  [ChainId.BSC_TESTNET]: {
    DeHub: '0x5A5e32fE118E7c7b6536d143F446269123c0ba74',
    BNB: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    BUSD: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
    'DeHub-BNB': '0x21B7576349f8F2178C83A8C3fe0ca4492f488d5D',
    'BNB-BUSD': '0xe0e92035077c39594793e61802a350347c320cf2',
    StandardLottery: '0xe5f4683dE66F20A8E1A2135f657aE97502E01e66',
    SpecialLottery: '0xD17fB29e54f1CFeC6D56A9f46F69F24d4F5Feedb',
    Prediction: '0x805Ae00834D1D8fD3ba65784A335C42366b7ecfb',
    ChainLinkOracle: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
    MultiCall: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
  },
};
