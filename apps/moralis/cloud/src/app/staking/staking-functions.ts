import { MoralisFunctions } from '@dehub/shared/model';
import { environment } from '../../environments/environment';
import { getStakingContracts } from '../shared';
import { ChainIdAsNumber } from '../shared/model';
import {
  getActiveStakingContract,
  getRewardContract,
  getStakingControllerContract,
} from './staking.util';

export const getStakingContractsFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    return await getStakingContracts();
  } catch (err) {
    logger.error(
      `${MoralisFunctions.Staking.GetStakingContracts} error: ${JSON.stringify(
        err
      )}`
    );
    return null;
  }
};

export const getActiveStakingContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    return await getActiveStakingContract(
      environment.web3.chainId as ChainIdAsNumber
    );
  } catch (err) {
    logger.error(
      `${
        MoralisFunctions.Staking.GetActiveStakingContract
      } error: ${JSON.stringify(err)}`
    );
    return null;
  }
};

export const getStakingControllerContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    return await getStakingControllerContract(
      environment.web3.chainId as ChainIdAsNumber
    );
  } catch (err) {
    logger.error(
      `${
        MoralisFunctions.Staking.GetStakingControllerContract
      } error: ${JSON.stringify(err)}`
    );
    return null;
  }
};

export const getRewardContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    return await getRewardContract(environment.web3.chainId as ChainIdAsNumber);
  } catch (err) {
    logger.error(
      `${MoralisFunctions.Staking.GetRewardContract} error: ${JSON.stringify(
        err
      )}`
    );
    return null;
  }
};
