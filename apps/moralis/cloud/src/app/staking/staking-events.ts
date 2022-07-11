import { MoralisClass } from '@dehub/shared/model';
import { environment } from '../../environments/environment';
import { updateCanPlay } from '../shared';
import { ChainIdAsNumber } from '../shared/model';
import RedisClient from '../shared/redis';

/**
 * Listen contracts table changes, if changes, clean redis data
 */
Moralis.Cloud.afterSave(MoralisClass.Contracts, async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();

    await redisClient.remove('getStakingContracts');
    await redisClient.remove('getActiveStakingContract');
    await redisClient.remove('getStakingControllerContract');
    await redisClient.remove('getRewardContract');
  } catch (err) {
    logger.error(`Contracts error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave(environment.dappName.staking, async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();

    await redisClient.remove('getStakingContracts');
    await redisClient.remove('getActiveStakingContract');
    await redisClient.remove('getStakingControllerContract');
  } catch (err) {
    logger.error(
      `${environment.dappName.staking} error: ${JSON.stringify(err)}`
    );
    return;
  }
});

Moralis.Cloud.afterSave(environment.dappName.bnbReward, async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();

    await redisClient.remove('getRewardContract');
  } catch (err) {
    logger.error(
      `${environment.dappName.bnbReward} error: ${JSON.stringify(err)}`
    );
    return;
  }
});

Moralis.Cloud.afterSave(
  environment.staking.eventTables.deposit,
  async request => {
    const logger = Moralis.Cloud.getLogger();
    try {
      const address = request.object.get('user');
      logger.info(`Noticed DeHubStakingDepositEvents, address: ${address}`);

      await updateCanPlay(environment.web3.chainId as ChainIdAsNumber, address);
    } catch (err) {
      logger.error(`DeHubStakingDepositEvents error: ${JSON.stringify(err)}`);
      return;
    }
  }
);

Moralis.Cloud.afterSave(
  environment.staking.eventTables.harvest,
  async request => {
    const logger = Moralis.Cloud.getLogger();
    try {
      const address = request.object.get('user');
      logger.info(`Noticed DeHubStakingHarvestEvents, address: ${address}`);

      await updateCanPlay(environment.web3.chainId as ChainIdAsNumber, address);
    } catch (err) {
      logger.error(`DeHubStakingHarvestEvents error: ${JSON.stringify(err)}`);
      return;
    }
  }
);

Moralis.Cloud.afterSave(
  environment.staking.eventTables.withdraw,
  async request => {
    const logger = Moralis.Cloud.getLogger();
    try {
      const address = request.object.get('user');
      logger.info(`Noticed DeHubStakingWithdrawEvents, address: ${address}`);

      await updateCanPlay(environment.web3.chainId as ChainIdAsNumber, address);
    } catch (err) {
      logger.error(`DeHubStakingWithdrawEvents error: ${JSON.stringify(err)}`);
      return;
    }
  }
);

environment.staking.deprecatedEventTables &&
  Moralis.Cloud.afterSave(
    environment.staking.deprecatedEventTables.deposit,
    async request => {
      const logger = Moralis.Cloud.getLogger();
      try {
        const address = request.object.get('user');
        logger.info(
          `Noticed DeprecatedDeHubStakingDepositEvents, address: ${address}`
        );

        await updateCanPlay(
          environment.web3.chainId as ChainIdAsNumber,
          address
        );
      } catch (err) {
        logger.error(
          `DeprecatedStakingDepositEvents error: ${JSON.stringify(err)}`
        );
        return;
      }
    }
  );

environment.staking.deprecatedEventTables &&
  Moralis.Cloud.afterSave(
    environment.staking.deprecatedEventTables.harvest,
    async request => {
      const logger = Moralis.Cloud.getLogger();
      try {
        const address = request.object.get('user');
        logger.info(
          `Noticed DeprecatedDeHubStakingHarvestEvents, address: ${address}`
        );

        await updateCanPlay(
          environment.web3.chainId as ChainIdAsNumber,
          address
        );
      } catch (err) {
        logger.error(
          `DeprecatedStakingHarvestEvents error: ${JSON.stringify(err)}`
        );
        return;
      }
    }
  );

environment.staking.deprecatedEventTables &&
  Moralis.Cloud.afterSave(
    environment.staking.deprecatedEventTables.withdraw,
    async request => {
      const logger = Moralis.Cloud.getLogger();
      try {
        const address = request.object.get('user');
        logger.info(
          `Noticed DeprecatedDeHubStakingWithdrawEvents, address: ${address}`
        );

        await updateCanPlay(
          environment.web3.chainId as ChainIdAsNumber,
          address
        );
      } catch (err) {
        logger.error(
          `DeprecatedStakingWithdrawEvents error: ${JSON.stringify(err)}`
        );
        return;
      }
    }
  );
