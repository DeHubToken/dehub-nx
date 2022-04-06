import { updateCanPlay } from './allrites-functions';
import { defChainId } from './configuration';

Moralis.Cloud.afterSave('DeHubStakingDepositEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingDepositEvents, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(`DeHubStakingDepositEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeHubStakingHarvestEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingHarvestEvents, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(`DeHubStakingHarvestEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeHubStakingWithdrawEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingWithdrawEvents, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(`DeHubStakingWithdrawEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeprecatedStakingDepositEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingDepositEvents, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(
      `DeprecatedStakingDepositEvents error: ${JSON.stringify(err)}`
    );
    return;
  }
});

Moralis.Cloud.afterSave('DeprecatedStakingHarvestEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingHarvestEvents, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(
      `DeprecatedStakingHarvestEvents error: ${JSON.stringify(err)}`
    );
    return;
  }
});

Moralis.Cloud.afterSave('DeprecatedStakingWithdrawEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingWithdrawEvents, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(
      `DeprecatedStakingWithdrawEvents error: ${JSON.stringify(err)}`
    );
    return;
  }
});

Moralis.Cloud.beforeLogin(async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const { object: user } = request;
    const address = user.get('ethAddress');
    logger.info(`Noticed beforeLogin, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(`beforeLogin error: ${JSON.stringify(err)}`);
    return;
  }
});
