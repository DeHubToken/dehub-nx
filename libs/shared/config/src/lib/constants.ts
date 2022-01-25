export const DEHUB_DECIMALS = 5;
export const BNB_DECIMALS = 18;
export const BUSD_DECIMALS = 18;

export const BUSD_DISPLAY_DECIMALS = 2;
export const DEHUB_DISPLAY_DECIMALS = 2;

/** @deprecated please use from env */
export enum ChainId {
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
}

/** @deprecated please use from env */
interface NativeCurrencyInfo {
  name: string;
  symbol: string;
  decimals: number;
}

/** @deprecated please use from env */
export interface NetworkInfo {
  CHAIN_ID_HEX: string;
  CHAIN_ID_DEC: number;
  CHAIN_NAME: string;
  NATIVE_CURRENCY: NativeCurrencyInfo;
  RPC_URL: string;
  BLOCK_EXPLORER_URLS: string;
}

/** @deprecated please use from env */
export const Constants: { [key: number]: NetworkInfo } = {
  56: {
    CHAIN_ID_HEX: '0x38',
    CHAIN_ID_DEC: 56,
    CHAIN_NAME: 'Binance Smart Chain Mainnet',
    NATIVE_CURRENCY: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    RPC_URL:
      'https://speedy-nodes-nyc.moralis.io/6b2569937eb2e5cb5996d2dc/bsc/mainnet',
    BLOCK_EXPLORER_URLS: 'https://bscscan.com',
  },
  97: {
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

/** @deprecated please use from env */
export const ContractAddresses: {
  [chainId in ChainId]: { [label: string]: string };
} = {
  [ChainId.BSC_MAINNET]: {
    /** @deprecated please use from env */
    DeHub: '0xFC206f429d55c71cb7294EfF40c6ADb20dC21508',
    /** @deprecated please use from env */
    BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    /** @deprecated please use from env */
    BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    /** @deprecated please use from env */
    'DeHub-BNB': '0xE876eE0945CE80Ef821633f2C18950b33Fb85633',
    /** @deprecated please use from env */
    'BNB-BUSD': '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    /** @deprecated please use from env */
    StandardLottery: '0xF5A881B2c1Bc20DBE8E54674d65e8D66487da35e',
    /** @deprecated please use from env */
    SpecialLottery: '0xdA9F2a546AfF5deDCF464205B229d18ab35B2d22',
    /** @deprecated please use from env */
    Prediction: '0xF73bee744210292973A51B1Cc4ef535519757dCc',
    /** @deprecated please use from env */
    ChainLinkOracle: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
    /** @deprecated please use from env */
    MultiCall: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    /** @deprecated please use from env */
    Staking: '',
    /** @deprecated please use from env */
    Rewards: '',
  },
  [ChainId.BSC_TESTNET]: {
    /** @deprecated please use from env */
    DeHub: '0x5aac501a81d9e4f173c4215ecd4315072c6c40b2',
    /** @deprecated please use from env */
    BNB: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    /** @deprecated please use from env */
    BUSD: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
    /** @deprecated please use from env */
    'DeHub-BNB': '0x21B7576349f8F2178C83A8C3fe0ca4492f488d5D',
    /** @deprecated please use from env */
    'BNB-BUSD': '0xe0e92035077c39594793e61802a350347c320cf2',
    /** @deprecated please use from env */
    StandardLottery: '0xe5f4683dE66F20A8E1A2135f657aE97502E01e66',
    /** @deprecated please use from env */
    SpecialLottery: '0xD17fB29e54f1CFeC6D56A9f46F69F24d4F5Feedb',
    /** @deprecated please use from env */
    Prediction: '0x805Ae00834D1D8fD3ba65784A335C42366b7ecfb',
    /** @deprecated please use from env */
    ChainLinkOracle: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
    /** @deprecated please use from env */
    MultiCall: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
    /** @deprecated please use from env */
    Staking: '0x0815ce2EDf97dF64182cF0fbf3bd2f52C273b1aF',
    /** @deprecated please use from env */
    Rewards: '0x746a1Ea2AF87474B77038963E4e7eAb3bb5f8082',
  },
};
