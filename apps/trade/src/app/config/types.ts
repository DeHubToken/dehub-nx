import BigNumber from 'bignumber.js';
import { environment } from '../../environments/environment';

const GELATO_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const FEES_NUMERATOR = new BigNumber(997);
export const FEES_DENOMINATOR = new BigNumber(1000);

export const MAX_DECIMAL_DIGITS = 6;

export interface Currency {
  decimals: number;
  symbol?: string;
  name?: string;
}

export interface Token extends Currency {
  chainId: number;
  address: string;
  logoUri?: string;
}

// export const ETHER: Currency = {
//   decimals: 18,
//   symbol: 'BNB',
//   name: 'BNB',
// };

export const ETHERToken: Token = {
  decimals: 18,
  symbol: 'ETH',
  name: 'ETH',
  chainId: environment.web3.chainId,
  address: GELATO_ADDRESS,
};

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export interface Pair {
  currencyId: string;
  reserve0: BigNumber;
  reserve1: BigNumber;
}

export interface Trade {
  pair: Pair;
  tokenIn: Token;
  tokenOut: Token;
  tradeType: TradeType;
  amountIn: BigNumber | null;
  amountOut: BigNumber | null;
}
