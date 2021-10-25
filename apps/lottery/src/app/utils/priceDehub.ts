import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { ChainId, ContractAddresses } from '@dehub/shared/config';
import { ethersToBigNumber } from '@dehub/shared/utils';

import Bep20Abi from '../config/abis/erc20.json';
import PancakeFactoryAbi from '../config/abis/PancakeFactory.json';
import PancakePairAbi from '../config/abis/PancakePair.json';
import { getChainId } from '../config/constants';
import { getContract } from './contractHelpers';

const PancakeFactoryAddress: { [chainId in ChainId]: string } = {
  [ChainId.BSC_MAINNET]: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
  [ChainId.BSC_TESTNET]: '0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc',
};

const getPancakePairAddress = async (
  quoteToken: string,
  baseToken: string
): Promise<string> => {
  const factoryAddress = PancakeFactoryAddress[getChainId()];
  const factoryContract = getContract(factoryAddress, PancakeFactoryAbi);

  const pairAddress = await factoryContract.getPair(quoteToken, baseToken);
  return pairAddress;
};

const getPancakeLiquidityInfo = async (
  quoteToken: string,
  baseToken: string
) => {
  const pairAddress = await getPancakePairAddress(quoteToken, baseToken);
  const pairContract = getContract(pairAddress, PancakePairAbi);

  const quoteTokenContract = getContract(quoteToken, Bep20Abi);
  const baseTokenContract = getContract(baseToken, Bep20Abi);

  const quoteTokenDecimals = await quoteTokenContract.decimals();
  const baseTokenDecimals = await baseTokenContract.decimals();

  const reserves = await pairContract.getReserves();
  const token0 = await pairContract.token0();

  if (token0.toLowerCase() === quoteToken.toLowerCase()) {
    return {
      quoteToken: {
        decimals: quoteTokenDecimals,
        reserve: reserves[0],
      },
      baseToken: {
        decimals: baseTokenDecimals,
        reserve: reserves[1],
      },
    };
  } else {
    return {
      quoteToken: {
        decimals: quoteTokenDecimals,
        reserve: reserves[1],
      },
      baseToken: {
        decimals: baseTokenDecimals,
        reserve: reserves[0],
      },
    };
  }
};

export const getBNBPrice = async (): Promise<BigNumber> => {
  const bnbAddress = ContractAddresses[getChainId()]['BNB'];
  const busdAddress = ContractAddresses[getChainId()]['BUSD'];

  const bnbBusdLp = await getPancakeLiquidityInfo(bnbAddress, busdAddress);
  return ethersToBigNumber(
    bnbBusdLp.baseToken.reserve.div(bnbBusdLp.quoteToken.reserve)
  );
};

export const getDehubPrice = async (): Promise<BigNumber> => {
  const dehubAddress = ContractAddresses[getChainId()]['Dehub'];
  const bnbAddress = ContractAddresses[getChainId()]['BNB'];

  const tokenBnbLp = await getPancakeLiquidityInfo(dehubAddress, bnbAddress);

  const bnbPrice = await getBNBPrice();
  const bnbPriceAsEth = ethers.BigNumber.from(bnbPrice.toString());
  return ethersToBigNumber(
    tokenBnbLp.baseToken.reserve
      .mul(bnbPriceAsEth)
      .div(tokenBnbLp.quoteToken.reserve)
  );
};

export default getDehubPrice;
