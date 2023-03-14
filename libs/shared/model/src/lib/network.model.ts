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

export const networks: { [key: number]: NetworkInfo } = {
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
