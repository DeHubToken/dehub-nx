import { environment } from '../../environments/environment';
import { updateCanPlay } from '../shared';
import { ChainIdAsNumber } from '../shared/model';

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
