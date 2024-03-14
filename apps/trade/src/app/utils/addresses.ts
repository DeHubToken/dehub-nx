import { environment } from '../../environments/environment';

export const getAddress = (label: string): string => {
  const contracts = environment.web3.addresses.contracts;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (contracts as any)[label];
};

export const getMultiCallAddress = (): string => {
  return getAddress('multiCall');
};

export const getDehubAddress = (): string => {
  return getAddress('dehubEth');
};

export const getWETHAddress = (): string => {
  return getAddress('weth');
};

export const getUSDTAddress = (): string => {
  return getAddress('usdt');
};

export const getRouterAddress = (): string => {
  return environment.swap.router;
};
