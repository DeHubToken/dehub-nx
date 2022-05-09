import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Token } from '../config/types';
import { useSwapState } from '../states/swap/hooks';
import { getTradeExactInOut } from '../utils/pairs';

export const useTradeExactInOut = (
  tokenIn?: Token | null,
  amountIn?: BigNumber,
  tokenOut?: Token | null
): BigNumber | null => {
  const { pair } = useSwapState();

  return useMemo(() => {
    if (pair && tokenIn && amountIn && tokenOut) {
      return getTradeExactInOut(
        amountIn,
        new BigNumber(pair.reserve0),
        new BigNumber(pair.reserve1)
      );
    }

    return null;
  }, [pair, tokenIn, amountIn, tokenOut]);
};

export const useTradeInExactOut = (
  tokenOut?: Token | null,
  amountOut?: BigNumber,
  tokenIn?: Token | null
) => {
  const { pair } = useSwapState();

  return useMemo(() => {
    if (pair && tokenOut && amountOut && tokenIn) {
      return getTradeExactInOut(
        amountOut,
        new BigNumber(pair.reserve0),
        new BigNumber(pair.reserve1)
      );
    }

    return null;
  }, [pair, tokenOut, amountOut, tokenIn]);
};
