interface NativeCurrencyInfo {
  name: string;
  symbol: string;
  decimals: number;
}

interface NetworkInfo {
  chainId: number;
  chainName: string;
  nativeCurrency: NativeCurrencyInfo;
  blockExplorerUrl: string;

  /** Array of available nodes to connect to */
  nodes: string[];
}

export const nullAddress = '0x000000000000000000000000000000000000dead';

export const networks: { [key: number]: NetworkInfo } = {
  1: {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'eth',
      decimals: 18,
    },
    blockExplorerUrl: 'https://etherscan.com',
    nodes: [
      'https://rpc.flashbots.net/fast',
      'https://gateway.tenderly.co/public/mainnet',
    ],
  },
  5: {
    chainId: 5,
    chainName: 'Ethereum Goerli',
    nativeCurrency: {
      name: 'MACTIC',
      symbol: 'MACTIC',
      decimals: 18,
    },
    blockExplorerUrl: 'https://goerliscan.com',
    nodes: [
      'https://goerli.gateway.tenderly.co',
      'https://ethereum-goerli.publicnode.com',
    ],
  },
  80001: {
    chainId: 80001,
    chainName: 'Mumbai Polygon Testnet',
    nativeCurrency: {
      name: 'MACTIC',
      symbol: 'MACTIC',
      decimals: 18,
    },
    blockExplorerUrl: 'https://mumbaiscan.com',
    nodes: [
      'https://polygon-mumbai-pokt.nodies.app',
      'https://endpoints.omniatech.io/v1/matic/mumbai/public',
    ],
  },
  137: {
    chainId: 137,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'eth',
      decimals: 18,
    },
    blockExplorerUrl: 'https://polyscan.com',
    nodes: [
      'https://polygon.drpc.org',
      'https://polygon-mainnet.public.blastapi.io',
    ],
  },
  56: {
    chainId: 56,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    blockExplorerUrl: 'https://bscscan.com',
    nodes: [
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
    ],
  },
  97: {
    chainId: 97,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    blockExplorerUrl: 'https://testnet.bscscan.com',
    nodes: [
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
      'https://data-seed-prebsc-1-s2.binance.org:8545/',
      'https://data-seed-prebsc-2-s2.binance.org:8545/',
      'https://data-seed-prebsc-1-s3.binance.org:8545/',
      'https://data-seed-prebsc-2-s3.binance.org:8545/',
      'https://bsc-testnet.public.blastapi.io',
    ],
  },
};
