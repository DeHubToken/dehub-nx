import { environment } from '../../environments/environment';

export const getAddress = (label: string): string => {
  const contracts = {
    ...environment.web3.addresses.contracts,
    ...environment.contracts,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (contracts as any)[label];
};

export const getStandardLotteryAddress = (): string => {
  return getAddress('standardRaffle');
};

export const getSpecialLotteryAddress = (): string => {
  return getAddress('specialRaffle');
};

export const getMultiCallAddress = (): string => {
  return getAddress('multiCall');
};

export const getDehubAddress = (): string => {
  return getAddress('dehub');
};

export const getBnbAddress = (): string => {
  return getAddress('wbnb');
};
