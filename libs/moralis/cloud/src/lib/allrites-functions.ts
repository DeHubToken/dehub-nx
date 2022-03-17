import { getOTTMinTokensToPlay, SupportedNetwork } from './configuration';
import { isMoralisUserByAddress } from './queries-functions';
import { getDeHubTokenBalance, getStakedAmount } from './web3api-functions';

export async function setCanPlay(user: Moralis.User, value: boolean) {
  const logger = Moralis.Cloud.getLogger();
  try {
    if (user) {
      logger.info(`setting can_play: ${JSON.stringify(user)}, ${value}`);
      user.set('can_play', value);
      await user
        .save(null, { useMasterKey: true })
        .then((user: Moralis.User) => {
          logger.info(
            `setCanPlay(${user.get('ethAddress')}, ${user.get('can_play')})`
          );
        });
    } else {
      logger.error('Not found Moralis User to set can_play');
    }
  } catch (err) {
    logger.error(`setCanPlay error: ${JSON.stringify(err)}`);
  }
}

/**
 * Update can_play according to the balance of holding and staking
 * @param {*} address user address
 */
export async function updateCanPlay(
  chainId: SupportedNetwork,
  address: string
) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const user = await isMoralisUserByAddress(address);
    if (!user) {
      logger.error(`Not found Moralis User: ${address}`);
      return;
    }
    const balance = await getDeHubTokenBalance(chainId, address);
    logger.info(`user DeHub balance(${address}): ${balance.toString()}`);
    const staked = await getStakedAmount(chainId, address);
    logger.info(`user staked DeHub amount(${address}): ${staked.toString()}`);
    const total = balance.plus(staked);
    logger.info(`user total DeHub balance(${address}): ${total.toString()}`);

    const minAmount = await getOTTMinTokensToPlay();
    await setCanPlay(user, total.gte(minAmount) ? true : false);
  } catch (err) {
    logger.error(`updateCanPlay error: ${JSON.stringify(err)}`);
    return;
  }
}
