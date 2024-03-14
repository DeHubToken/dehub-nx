import { BIG_ONE, BIG_ZERO } from '@dehub/shared/utils';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import BigNumber from 'bignumber.js';
import { environment } from '../../environments/environment';
import UniswapV2PairAbi from '../config/abis/UniswapV2Pair.json';
import { FEES_DENOMINATOR, FEES_NUMERATOR, TradeType } from '../config/types';
import { Call, multicallv2 } from '../utils/multicall';
import { getWETHAddress } from './addresses';

export const getPairAddress = (token0: string, token1: string): string => {
  const weth = getWETHAddress();
  const addr0 = token0 === 'ETH' ? weth : token0,
    addr1 = token1 === 'ETH' ? weth : token1;

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
  const [reserves] = await multicallv2(UniswapV2PairAbi, reserveCalls);
  if (reserves.length < 0) return null;

  return [reserves[0], reserves[1]];
};

export const getTradeExactInOut = (
  amountIn: BigNumber,
  reserve0: BigNumber,
  reserve1: BigNumber
): BigNumber | null => {
  if (amountIn.isNaN()) return null;
  if (reserve0.eq(BIG_ZERO) || reserve1.eq(BIG_ZERO)) return null;

  const inputAmountWithFee = amountIn.multipliedBy(FEES_NUMERATOR);
  const numerator = inputAmountWithFee.multipliedBy(reserve1);
  const denominator = new BigNumber(reserve0)
    .multipliedBy(FEES_DENOMINATOR)
    .plus(inputAmountWithFee);
  const outputAmount = numerator.div(denominator);
  return outputAmount;
};

export const getTradeInExactOut = (
  amountOut: BigNumber,
  reserve0: BigNumber,
  reserve1: BigNumber
): BigNumber | null => {
  if (amountOut.isNaN()) return null;
  if (amountOut.gte(reserve1)) return null;

  const numerator = reserve0
    .multipliedBy(amountOut)
    .multipliedBy(FEES_DENOMINATOR);
  const denominator = reserve1.minus(amountOut).multipliedBy(FEES_NUMERATOR);
  const outputAmount = numerator.div(denominator).dividedBy(BIG_ONE);
  return outputAmount;
};

export const maximumAmountIn = (
  tradeType: TradeType,
  amountIn: BigNumber,
  allowedSlippage: number
): BigNumber => {
  if (allowedSlippage <= 0) return BIG_ZERO;
  if (tradeType === TradeType.EXACT_INPUT) {
    return amountIn;
  }
  const hundred = new BigNumber(10000);
  return amountIn
    .multipliedBy(hundred.plus(allowedSlippage))
    .dividedBy(hundred);
};

export const minimumAmountOut = (
  tradeType: TradeType,
  amountOut: BigNumber,
  allowedSlippage: number
): BigNumber => {
  if (allowedSlippage <= 0) return BIG_ZERO;
  if (tradeType === TradeType.EXACT_OUTPUT) {
    return amountOut;
  }
  const hundred = new BigNumber(10000);
  return amountOut
    .multipliedBy(hundred)
    .dividedBy(hundred.plus(allowedSlippage));
};
