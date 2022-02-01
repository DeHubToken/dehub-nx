import { environment } from '../../environments/environment';

export const getAddress = (label: string): string => {
  const contracts = {
    ...environment.web3.addresses.contracts,
    ...environment.contracts,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (contracts as any)[label];
};

export const getMulticallAddress = () => {
  return getAddress('multiCall');
};

export const getDehubAddress = () => {
  return getAddress('dehub');
};

export const getPredictionsAddress = () => {
  return getAddress('prediction');
};

export const getChainlinkOracleAddress = () => {
  return getAddress('chainLinkOracle');
};
