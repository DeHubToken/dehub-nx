import { BIG_ONE } from '@dehub/shared/utils';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import BigNumber from 'bignumber.js';
import { environment } from '../../environments/environment';
import PancakePairAbi from '../config/abis/PancakePair.json';
import { FEES_DENOMINATOR, FEES_NUMERATOR } from '../config/types';
import { Call, multicallv2 } from '../utils/multicall';
import { getBnbAddress } from './addresses';

export const getPairAddress = (token0: string, token1: string): string => {
  const wbnb = getBnbAddress();
  const addr0 = token0 === 'BNB' ? wbnb : token0,
    addr1 = token1 === 'BNB' ? wbnb : token1;

  return getCreate2Address(
    environment.swap.factory,
    keccak256(['bytes'], [pack(['address', 'address'], [addr0, addr1])]),
    environment.swap.initCodeHash
  );
};

export const getReserves = async (
  pair: string
): Promise<[BigNumber, BigNumber] | null> => {
  const reserveCalls: Call[] = [
    {
      name: 'getReserves',
      address: pair,
      params: [],
    },
  ];
  const [reserves] = await multicallv2(PancakePairAbi, reserveCalls);
  if (reserves.length < 0) return null;

  return [reserves[0], reserves[1]];
};

export const getTradeExactInOut = (
  amountIn: BigNumber,
  reserve0: BigNumber,
  reserve1: BigNumber
): BigNumber | null => {
  if (amountIn.isNaN()) return null;

  const inputAmountWithFee = amountIn.multipliedBy(FEES_NUMERATOR);
  const numerator = inputAmountWithFee.multipliedBy(reserve1);
  const denominator = new BigNumber(reserve0)
    .multipliedBy(FEES_DENOMINATOR)
    .plus(inputAmountWithFee);
  const outputAmount = numerator.div(denominator);
  return outputAmount;
};

export const getTradeInExactout = (
  amountOut: BigNumber,
  reserve0: BigNumber,
  reserve1: BigNumber
): BigNumber | null => {
  if (amountOut.isNaN()) return null;

  const numerator = reserve0
    .multipliedBy(amountOut)
    .multipliedBy(FEES_DENOMINATOR);
  const denominator = reserve1.minus(amountOut).multipliedBy(FEES_NUMERATOR);
  const outputAmount = numerator.div(denominator).dividedBy(BIG_ONE);
  return outputAmount;
};
