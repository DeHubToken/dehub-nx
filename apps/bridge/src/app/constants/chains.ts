import ethereumLogo from "../../assets/ethereum-logo.svg";
import polygonLogo from "../../assets/polygon.svg"
import binanceLogo from "../../assets/bnb-bnb-logo.svg"
import { chain } from "lodash";
import { ContractInterface } from "@ethersproject/contracts";
import DeHubABI from './dehubABI.json';
import BridgeABI from './bridgeABI.json';
import BigNumber from "bignumber.js";

export enum CHAIN {
    ETHEREUM = 1,
    GOERLI = 5,
    BSC = 56,
    BSC_TESTNET = 97,
    POLYGON = 137,
    MUMBAI = 80001
}

export enum LAYERZEROID {
    ETHEREUM = 101,
    GOERLI = 10121,
    BSC = 102,
    BSC_TESTNET = 10102,
    POLYGON = 109,
    MUMBAI = 10109
}

export interface ChainInfo {
    dehubToken: string;
    bridgeContract: string;
    dehubTokenABI: ContractInterface;
    bridgeABI: ContractInterface;
}

export interface ChainType {
    name: string;
    logo: any;
    chainID: number;
    layerzeroID: number;
}

export const CHAININFO : {[chainId : number] : ChainInfo} = {
    // Mainnet
    [CHAIN.ETHEREUM] : {
        dehubToken: '',
        bridgeContract: '',
        dehubTokenABI: DeHubABI,
        bridgeABI: BridgeABI
    },
    [CHAIN.POLYGON] : {
        dehubToken: '',
        bridgeContract: '',
        dehubTokenABI: DeHubABI,
        bridgeABI: BridgeABI
    },
    [CHAIN.BSC] : {
        dehubToken: '',
        bridgeContract: '',
        dehubTokenABI: DeHubABI,
        bridgeABI: BridgeABI
    },

    // Testnet
    [CHAIN.GOERLI] : {
        dehubToken: '0x8402E4EC3A5439E6C4cC361dC710ee18181939A1',
        bridgeContract: '0xF5e3AF0A2E56c013581b271a18a1c99c8f9C5042',
        dehubTokenABI: DeHubABI,
        bridgeABI: BridgeABI
    },
    [CHAIN.BSC_TESTNET] : {
        dehubToken: '0x06918Be9843BA1F6Ba9289e93c29e8cFA5aCb470',
        bridgeContract: '0xC0e99ee54A41dEFa9BFeb34b768AB8AE6E37C7a9',
        dehubTokenABI: DeHubABI,
        bridgeABI: BridgeABI
    },
    [CHAIN.MUMBAI] : {
        dehubToken: '0x75Dc7deC79d269c6264Bb2dd1a804829F3B2A4f0',
        bridgeContract: '0xBF1A2dd3D629E0fB20e6A2d894FBb82c8EB79Ff1',
        dehubTokenABI: DeHubABI,
        bridgeABI: BridgeABI
    },
}

export const CHAINS : ChainType[] = [
    // // Mainnets
    // {
    //     name: "Ethereum",
    //     logo: ethereumLogo,
    //     chainID: CHAIN.ETHEREUM,
    //     layerzeroID: LAYERZEROID.ETHEREUM
    // },
    // {
    //     name: "Polygon",
    //     logo: polygonLogo,
    //     chainID: CHAIN.POLYGON,
    //     layerzeroID: LAYERZEROID.POLYGON
    // },
    // {
    //     name: "Binance",
    //     logo: binanceLogo,
    //     chainID: CHAIN.BSC,
    //     layerzeroID: LAYERZEROID.BSC
    // },

    // Testnets
    {
        name: "Polygon Mumbai",
        logo: polygonLogo,
        chainID: CHAIN.MUMBAI,
        layerzeroID: LAYERZEROID.MUMBAI
    },
    {
        name: "Goerli",
        logo: ethereumLogo,
        chainID: CHAIN.GOERLI,
        layerzeroID: LAYERZEROID.GOERLI
    },
    {
        name: "Binance Testnet",
        logo: binanceLogo,
        chainID: CHAIN.BSC_TESTNET,
        layerzeroID: LAYERZEROID.BSC_TESTNET
    },
]

export const MIN_VALUE = Number(10);
export const MAX_VALUE = Number.MAX_VALUE;