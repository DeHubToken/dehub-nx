import { environment } from '../../environments/environment';
import { getRewardContract } from '../shared/dapp.util';
import RedisClient from '../shared/redis';
import { ChainIdAsNumber } from '../shared/types';
import {
  getActiveStakingContracts,
  getStakingContracts,
  getStakingControllerContract,
} from '../staking/dapp.util';

Moralis.Cloud.define('getStakingContracts', async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        'getStakingContracts',
        async function () {
          return JSON.stringify(await getStakingContracts());
        },
        {
          expire: 1800,
        }
      )
    );
  } catch (err) {
    logger.error(`getStakingContracts error: ${JSON.stringify(err)}`);
    return null;
  }
});

Moralis.Cloud.define('getActiveStakingContracts', async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        'getActiveStakingContracts',
        async function (args) {
          return JSON.stringify(
            await getActiveStakingContracts(args as ChainIdAsNumber)
          );
        },
        {
          args: environment.web3.chainId as ChainIdAsNumber,
          expire: 1800,
        }
      )
    );
  } catch (err) {
    logger.error(`getActiveStakingContracts error: ${JSON.stringify(err)}`);
    return null;
  }
});

Moralis.Cloud.define('getStakingControllerContract', async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        'getStakingControllerContract',
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
    logger.error(`getStakingControllerContract error: ${JSON.stringify(err)}`);
    return null;
  }
});

Moralis.Cloud.define('getRewardContract', async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        'getRewardContract',
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
    logger.error(`getRewardContract error: ${JSON.stringify(err)}`);
    return null;
  }
});

export default Moralis;
