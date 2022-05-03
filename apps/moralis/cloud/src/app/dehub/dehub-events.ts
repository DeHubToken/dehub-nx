import { environment } from '../../environments/environment';
import { updateCanPlay } from '../shared';
import { ChainIdAsNumber } from '../shared/model';

Moralis.Cloud.beforeLogin(async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const { object: user } = request;
    const address = user.get('ethAddress');
    logger.info(`Noticed beforeLogin, address: ${address}`);

    await updateCanPlay(environment.web3.chainId as ChainIdAsNumber, address);
  } catch (err) {
    logger.error(`beforeLogin error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.beforeSaveFile(() => {
  throw 'Not Allowed';
});
