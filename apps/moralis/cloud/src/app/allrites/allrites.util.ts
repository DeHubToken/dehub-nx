import { getOTTMinTokensToPlay, getWhitelisted } from '../allrites/dapp.util';
import { ChainIdAsNumber } from '../shared/types';
import { isMoralisUserByAddress } from '../shared/user.util';
import { getStakedAmount } from '../staking/staking.util';

async function setCanPlay(user: MoralisUser, value: boolean) {
  const logger = Moralis.Cloud.getLogger();
  try {
    if (user) {
      logger.info(`setting can_play: ${JSON.stringify(user)}, ${value}`);
      user.set('can_play', value);
      await user
        .save(null, { useMasterKey: true })
        .then((user: MoralisUser) => {
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
export async function updateCanPlay(chainId: ChainIdAsNumber, address: string) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const user = await isMoralisUserByAddress(address);
    if (!user) {
      logger.error(`Not found Moralis User: ${address}`);
      return;
    }
    // check if user is already whitelisted
    const whitelisted = await getWhitelisted();
    if (whitelisted && whitelisted.indexOf(address) >= 0) {
      logger.error(`Whitelisted user: ${address}`);
      return;
    }
    const staked = await getStakedAmount(chainId, address);
    logger.info(`user staked DeHub amount(${address}): ${staked.toString()}`);

    const minAmount = await getOTTMinTokensToPlay();
    await setCanPlay(user, staked.gte(minAmount) ? true : false);
  } catch (err) {
    logger.error(`updateCanPlay error: ${JSON.stringify(err)}`);
    return;
  }
}
