import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import { environment } from '../../../environments/environment';

export const TICKET_LIMIT_PER_REQUEST = 2500;
export const MAX_DELOTTO_REQUEST_SIZE = 100;
export const MAX_DEGRAND_REQUEST_SIZE = 10;
export const FIRST_LAUNCH_DATE = new Date('2022-01-15');
export const FIRST_QUARTER_NUMBER = 202201;

export const getChainId = (): number => {
  return environment.web3.chainId;
};

export const getChainIdHex = (): string => {
  return decimalToHex(environment.web3.chainId);
};

export const MINUTE_IN_SECONDS = 60;
export const HOUR_IN_SECONDS = 3600;
export const DAY_IN_SECONDS = 86400;
