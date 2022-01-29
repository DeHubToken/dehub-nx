import { environment } from '../../../environments/environment';

export const getChainId = (): number => {
  return environment.web3.networks.bsc.chainId;
};

export const getChainIdHex = (): string => {
  return environment.web3.networks.bsc.chainIdHex;
};
