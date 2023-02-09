import { environment } from '../../environments/environment';

export const getAddress = (label: string): string | string[] => {
  const contracts = {
    ...environment.web3.addresses.contracts,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (contracts as any)[label];
};

export const getMultiCallAddress = (): string => {
  return getAddress('multiCall') as string;
};

export const getDehubAddress = (): string => {
  return getAddress('dehub') as string;
};

export const getBnbAddress = (): string => {
  return getAddress('bnb') as string;
};

export const getStakingAddress = (): string => {
  return getAddress('staking') as string;
};
