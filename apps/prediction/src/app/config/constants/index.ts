import { decimalToHex } from '@dehub/shared/utils';
import { environment } from '../../../environments/environment';

export const getChainId = (): number => {
  return environment.web3.chainId;
};

export const getChainIdHex = (): string => {
  return decimalToHex(environment.web3.chainId);
};
