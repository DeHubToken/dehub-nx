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
  nodes: string[];
}

export const Networks: { [key: number]: NetworkInfo } = {
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
      'https://speedy-nodes-nyc.moralis.io/67d501c9b939411392ca9321/bsc/mainnet',
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
      'https://speedy-nodes-nyc.moralis.io/67d501c9b939411392ca9321/bsc/testnet',
    ],
  },
};
