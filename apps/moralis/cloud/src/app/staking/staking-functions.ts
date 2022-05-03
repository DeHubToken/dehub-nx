import { environment } from '../../environments/environment';
import { getStakingContracts } from '../shared';
import { ChainIdAsNumber } from '../shared/model';
import RedisClient from '../shared/redis';
import { StakingFunctions } from './staking.model';
import {
  getActiveStakingContract,
  getRewardContract,
  getStakingControllerContract,
} from './staking.util';

export const getStakingContractsFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        StakingFunctions.GetStakingContracts,
        async () => JSON.stringify(await getStakingContracts()),
        { expire: 1800 }
      )
    );
  } catch (err) {
    logger.error(
      `${StakingFunctions.GetStakingContracts} error: ${JSON.stringify(err)}`
    );
    return null;
  }
};

export const getActiveStakingContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        StakingFunctions.GetActiveStakingContract,
        async function (args) {
          return JSON.stringify(
            await getActiveStakingContract(args as ChainIdAsNumber)
          );
        },
        {
          args: environment.web3.chainId as ChainIdAsNumber,
          expire: 1800,
        }
      )
    );
  } catch (err) {
    logger.error(
      `${StakingFunctions.GetActiveStakingContract} error: ${JSON.stringify(
        err
      )}`
    );
    return null;
  }
};

export const getStakingControllerContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        StakingFunctions.GetStakingControllerContract,
        async function (args) {
          return JSON.stringify(
            await getStakingControllerContract(args as ChainIdAsNumber)
          );
        },
        {
          args: environment.web3.chainId as ChainIdAsNumber,
          expire: 1800,
        }
      )
    );
  } catch (err) {
    logger.error(
      `${StakingFunctions.GetStakingControllerContract} error: ${JSON.stringify(
        err
      )}`
    );
    return null;
  }
};

export const getRewardContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        StakingFunctions.GetRewardContract,
        async function (args) {
          return JSON.stringify(
            await getRewardContract(args as ChainIdAsNumber)
          );
        },
        {
          args: environment.web3.chainId as ChainIdAsNumber,
          expire: 1800,
        }
      )
    );
  } catch (err) {
    logger.error(
      `${StakingFunctions.GetRewardContract} error: ${JSON.stringify(err)}`
    );
    return null;
  }
};
