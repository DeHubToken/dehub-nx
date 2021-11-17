import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import web3NoAccount from './web3';
import { poolsConfig } from '../config/constants';
import { PoolCategory, PoolConfig } from '../config/constants/types';

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getCakeAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getCakeVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
} from './addressHelpers';

// ABI
import profileABI from '../config/abi/pancakeProfile.json';
import pancakeRabbitsAbi from '../config/abi/pancakeRabbits.json';
import bunnyFactoryAbi from '../config/abi/bunnyFactory.json';
import bunnySpecialAbi from '../config/abi/bunnySpecial.json';
import bep20Abi from '../config/abi/erc20.json';
import erc721Abi from '../config/abi/erc721.json';
import lpTokenAbi from '../config/abi/lpToken.json';
import cakeAbi from '../config/abi/cake.json';
import ifoV1Abi from '../config/abi/ifoV1.json';
import ifoV2Abi from '../config/abi/ifoV2.json';
import pointCenterIfo from '../config/abi/pointCenterIfo.json';
import lotteryAbi from '../config/abi/lottery.json';
import lotteryTicketAbi from '../config/abi/lotteryNft.json';
import masterChef from '../config/abi/masterchef.json';
import sousChef from '../config/abi/sousChef.json';
import sousChefV2 from '../config/abi/sousChefV2.json';
import sousChefBnb from '../config/abi/sousChefBnb.json';
import claimRefundAbi from '../config/abi/claimRefund.json';
import tradingCompetitionAbi from '../config/abi/tradingCompetition.json';
import easterNftAbi from '../config/abi/easterNft.json';
import cakeVaultAbi from '../config/abi/cakeVault.json';
import predictionsAbi from '../config/abi/predictions.json';
import chainlinkOracleAbi from '../config/abi/chainlinkOracle.json';

const getContract = (abi: AbiItem, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi as unknown as AbiItem, address);
};

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi as unknown as AbiItem, address, web3);
};
export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi as unknown as AbiItem, address, web3);
};
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi as unknown as AbiItem, address, web3);
};
export const getIfoV1Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV1Abi as unknown as AbiItem, address, web3);
};
export const getIfoV2Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV2Abi as unknown as AbiItem, address, web3);
};
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find(pool => pool.sousId === id) as PoolConfig;
  const abi =
    config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef;
  return getContract(
    abi as unknown as AbiItem,
    getAddress(config.contractAddress),
    web3
  );
};
export const getSouschefV2Contract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find(pool => pool.sousId === id) as PoolConfig;
  return getContract(
    sousChefV2 as unknown as AbiItem,
    getAddress(config.contractAddress),
    web3
  );
};
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(
    pointCenterIfo as unknown as AbiItem,
    getPointCenterIfoAddress(),
    web3
  );
};
export const getCakeContract = (web3?: Web3) => {
  return getContract(cakeAbi as unknown as AbiItem, getCakeAddress(), web3);
};
export const getProfileContract = (web3?: Web3) => {
  return getContract(
    profileABI as unknown as AbiItem,
    getPancakeProfileAddress(),
    web3
  );
};
export const getPancakeRabbitContract = (web3?: Web3) => {
  return getContract(
    pancakeRabbitsAbi as unknown as AbiItem,
    getPancakeRabbitsAddress(),
    web3
  );
};
export const getBunnyFactoryContract = (web3?: Web3) => {
  return getContract(
    bunnyFactoryAbi as unknown as AbiItem,
    getBunnyFactoryAddress(),
    web3
  );
};
export const getBunnySpecialContract = (web3?: Web3) => {
  return getContract(
    bunnySpecialAbi as unknown as AbiItem,
    getBunnySpecialAddress(),
    web3
  );
};
export const getLotteryContract = (web3?: Web3) => {
  return getContract(
    lotteryAbi as unknown as AbiItem,
    getLotteryAddress(),
    web3
  );
};
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(
    lotteryTicketAbi as unknown as AbiItem,
    getLotteryTicketAddress(),
    web3
  );
};
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(
    masterChef as unknown as AbiItem,
    getMasterChefAddress(),
    web3
  );
};
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(
    claimRefundAbi as unknown as AbiItem,
    getClaimRefundAddress(),
    web3
  );
};
export const getTradingCompetitionContract = (web3?: Web3) => {
  return getContract(
    tradingCompetitionAbi as unknown as AbiItem,
    getTradingCompetitionAddress(),
    web3
  );
};
export const getEasterNftContract = (web3?: Web3) => {
  return getContract(
    easterNftAbi as unknown as AbiItem,
    getEasterNftAddress(),
    web3
  );
};
export const getCakeVaultContract = (web3?: Web3) => {
  return getContract(
    cakeVaultAbi as unknown as AbiItem,
    getCakeVaultAddress(),
    web3
  );
};
export const getPredictionsContract = (web3?: Web3) => {
  return getContract(
    predictionsAbi as unknown as AbiItem,
    getPredictionsAddress(),
    web3
  );
};
export const getChainlinkOracleContract = (web3?: Web3) => {
  return getContract(
    chainlinkOracleAbi as unknown as AbiItem,
    getChainlinkOracleAddress(),
    web3
  );
};
