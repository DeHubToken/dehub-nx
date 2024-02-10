import { ContractInterface } from '@ethersproject/contracts';
import BridgeABI from './bridgeABI.json';
import DeHubABI from './dehubABI.json';

export enum CHAIN {
  ETHEREUM = 1,
  GOERLI = 5,
  BSC = 56,
  BSC_TESTNET = 97,
  POLYGON = 137,
  MUMBAI = 80001,
}

export enum LAYER_ZERO_ID {
  ETHEREUM = 101,
  GOERLI = 10121,
  BSC = 102,
  BSC_TESTNET = 10102,
  POLYGON = 109,
  MUMBAI = 10109,
}

export interface ChainInfo {
  dehubToken: string;
  bridgeContract: string;
  dehubTokenABI: ContractInterface;
  bridgeABI: ContractInterface;
}

export interface ChainType {
  name: string;
  logo: string;
  chainID: number;
  layerZeroID: number;
}

export const CHAIN_INFO: { [chainId: number]: ChainInfo } = {
  // Mainnet
  [CHAIN.ETHEREUM]: {
    dehubToken: '0x99BB69Ee1BbFC7706C3ebb79b21C5B698fe58EC0',
    bridgeContract: '0x25FB08d06CE3eF2CEaA971B786963fcFa397b537',
    dehubTokenABI: DeHubABI,
    bridgeABI: BridgeABI,
  },
  [CHAIN.POLYGON]: {
    dehubToken: '0x6051e59eb50BB568415B6C476Fbd394EEF83834D',
    bridgeContract: '0x25FB08d06CE3eF2CEaA971B786963fcFa397b537',
    dehubTokenABI: DeHubABI,
    bridgeABI: BridgeABI,
  },
  [CHAIN.BSC]: {
    dehubToken: '0x680D3113caf77B61b510f332D5Ef4cf5b41A761D',
    bridgeContract: '0x25FB08d06CE3eF2CEaA971B786963fcFa397b537',
    dehubTokenABI: DeHubABI,
    bridgeABI: BridgeABI,
  },

  // Testnet
  [CHAIN.GOERLI]: {
    dehubToken: '0x8402E4EC3A5439E6C4cC361dC710ee18181939A1',
    bridgeContract: '0xF5e3AF0A2E56c013581b271a18a1c99c8f9C5042',
    dehubTokenABI: DeHubABI,
    bridgeABI: BridgeABI,
  },
  [CHAIN.BSC_TESTNET]: {
    dehubToken: '0x06918Be9843BA1F6Ba9289e93c29e8cFA5aCb470',
    bridgeContract: '0xC0e99ee54A41dEFa9BFeb34b768AB8AE6E37C7a9',
    dehubTokenABI: DeHubABI,
    bridgeABI: BridgeABI,
  },
  [CHAIN.MUMBAI]: {
    dehubToken: '0x75Dc7deC79d269c6264Bb2dd1a804829F3B2A4f0',
    bridgeContract: '0xBF1A2dd3D629E0fB20e6A2d894FBb82c8EB79Ff1',
    dehubTokenABI: DeHubABI,
    bridgeABI: BridgeABI,
  },
};

export const CHAINS: ChainType[] = [
  // Mainnet
  {
    name: 'Ethereum',
    logo: 'ethereum-logo.svg',
    chainID: CHAIN.ETHEREUM,
    layerZeroID: LAYER_ZERO_ID.ETHEREUM,
  },
  {
    name: 'Polygon',
    logo: 'polygon.svg',
    chainID: CHAIN.POLYGON,
    layerZeroID: LAYER_ZERO_ID.POLYGON,
  },
  {
    name: 'Binance',
    logo: 'bnb-bnb-logo.svg',
    chainID: CHAIN.BSC,
    layerZeroID: LAYER_ZERO_ID.BSC,
  },

  // Testnet
  // {
  //   name: 'Polygon Mumbai',
  //   logo: 'polygon.svg',
  //   chainID: CHAIN.MUMBAI,
  //   layerZeroID: LAYER_ZERO_ID.MUMBAI,
  // },
  // {
  //   name: 'Goerli',
  //   logo: 'ethereum-logo.svg',
  //   chainID: CHAIN.GOERLI,
  //   layerZeroID: LAYER_ZERO_ID.GOERLI,
  // },
  // {
  //   name: 'Binance Testnet',
  //   logo: 'bnb-bnb-logo.svg',
  //   chainID: CHAIN.BSC_TESTNET,
  //   layerZeroID: LAYER_ZERO_ID.BSC_TESTNET,
  // },
];

export const MIN_VALUE = Number(10);
export const MAX_VALUE = Number.MAX_VALUE;
export const FEE: { [chainId: number]: number } =
  // 0.001;
  {
    [CHAIN.ETHEREUM]: 0.000005,
    [CHAIN.GOERLI]: 0.000005,
    [CHAIN.BSC]: 0.00007,
    [CHAIN.BSC_TESTNET]: 0.0007,
    [CHAIN.POLYGON]: 0.05,
    [CHAIN.MUMBAI]: 0.05,
  };
