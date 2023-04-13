import { environment } from '../../environments/environment';

export const getMultiCallAddress = () =>
  environment.web3.addresses.contracts.multiCall;

export const getDehubBscAddress = () =>
  environment.web3.addresses.contracts.dehubBsc;

export const getBnbAddress = () => environment.web3.addresses.contracts.wbnb;

export const getStakingAddress = () =>
  environment.web3.addresses.contracts.staking;
