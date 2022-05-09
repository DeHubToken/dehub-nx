import BigNumber from 'bignumber.js';
import { environment } from '../../environments/environment';

const GELATO_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const FEES_NUMERATOR = new BigNumber(9975);
export const FEES_DENOMINATOR = new BigNumber(10000);

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
  symbol: 'BNB',
  name: 'BNB',
  chainId: environment.web3.chainId,
  address: GELATO_ADDRESS,
};
