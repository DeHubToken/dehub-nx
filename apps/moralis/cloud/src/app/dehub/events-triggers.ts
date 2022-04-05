import { updateCanPlay } from './allrites-functions';
import { chainId } from './configuration';

/**
 * Subscribe the balance table, and if DeHub token balance has changed,
 * set `can_play` flag as true/false according to the holding balance.
 * The updates on this variable will automatically trigger calling to Allrites
 * so as to give an access to user
 */
Moralis.Cloud.afterSave('DeHubTokenTransferEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const fromAddress = request.object.get('from');
    const toAddress = request.object.get('to');
    logger.info(
      `Noticed DeHubTokenTransferEvents, from: ${fromAddress}, to: ${toAddress}`
    );

    await updateCanPlay(chainId, fromAddress);
    await updateCanPlay(chainId, toAddress);
  } catch (err) {
    logger.error(`DeHubTokenTransferEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeHubStakingDepositEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingDepositEvents, address: ${address}`);

    await updateCanPlay(chainId, address);
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

    await updateCanPlay(chainId, address);
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

    await updateCanPlay(chainId, address);
  } catch (err) {
    logger.error(`DeHubStakingWithdrawEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.beforeLogin(async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const { object: user } = request;
    const address = user.get('ethAddress');
    logger.info(`Noticed beforeLogin, address: ${address}`);

    await updateCanPlay(chainId, address);
  } catch (err) {
    logger.error(`beforeLogin error: ${JSON.stringify(err)}`);
    return;
  }
});
