/**
 * Get Moralis User by wallet address
 * Moralis User has multiple wallet address, if contains given address,
 * will return
 * @param {*} address
 * @returns user object if success, null if failed
 */

import {
  DeHubTokenContractPropsType,
  MoralisClass,
  StakingContractPropsType,
} from '@dehub/shared/model';
import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import { environment } from '../../environments/environment';
import { ChainIdAsNumber } from './model';

export async function isMoralisUserByAddress(
  address: string
): Promise<MoralisUser | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const query = new Moralis.Query(Moralis.User);
    query.contains('accounts', address);
    const users: MoralisUser[] = await query.find({
      useMasterKey: true,
    });
    if (users && users.length > 0) {
      return users[0];
    }
  } catch (err) {
    logger.error(`isMoralisUserByAddress error: ${JSON.stringify(err)}`);
  }
  return null;
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
    // Check if user is already whitelisted
    const whitelisted = await getWhitelisted();
    if (whitelisted && whitelisted.indexOf(address) >= 0) {
      logger.error(`Whitelisted user: ${address}`);
      const canPlay = user.get('can_play');
      if (!canPlay) {
        await setCanPlay(user, true);
      }
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

/**
 * Get contract properties and address/abis
 * @returns array of contract, every contract has 4 common properties
 * they are: address, name, chainId, abi
 */
export async function getDeHubContracts(dappName: string) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const Contracts = Moralis.Object.extend(MoralisClass.Contracts);
    const DeHubDapp = Moralis.Object.extend(dappName);

    const contractQuery = new Moralis.Query(Contracts);
    const dappQuery = new Moralis.Query(DeHubDapp);

    dappQuery.matchesQuery('contract', contractQuery);
    dappQuery.include('contract');

    const contracts = await dappQuery.find();
    for (let i = 0; i < contracts.length; i++) {
      const contract = contracts[i].get('contract');

      const address = contract.get('address');
      const name = contract.get('name');
      const chainId = contract.get('chainId');
      const abi = contract.get('abi');

      contracts[i].set('address', address);
      contracts[i].set('name', name);
      contracts[i].set('chainId', chainId);
      contracts[i].set('abi', abi);
    }
    return contracts;
  } catch (err) {
    logger.error(`getDeHubContracts error: ${JSON.stringify(err)}`);
  }
  return null;
}

export async function getStakingContracts(): Promise<
  StakingContractPropsType[] | null
> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const contracts = await getDeHubContracts(environment.dappName.staking);

    const collect: StakingContractPropsType[] = [];
    for (let i = 0; i < contracts.length; i++) {
      const year = contracts[i].get('year');
      const quarter = contracts[i].get('quarter');

      const contract = contracts[i].get('contract');
      const address = contract.get('address');

      const name = contract.get('name');
      const chainId = contract.get('chainId');
      const abi = contract.get('abi');

      collect.push({
        year,
        quarter,
        address,
        name,
        chainId,
        abi,
      });
    }
    return collect;
  } catch (err) {
    logger.error(`getStakingContracts error: ${JSON.stringify(err)}`);
  }
  return null;
}

/**
 * TODO: not used yet
 * @param targetChainId
 * @returns
 */
export async function getDeHubTokenContract(
  targetChainId: ChainIdAsNumber
): Promise<DeHubTokenContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = targetChainId;

    const contracts = await getDeHubContracts(environment.dappName.token);
    const filters = contracts.filter(contract => {
      const chainId = contract.get('chainId');
      if (parseInt(chainId) !== decTargetChainId) {
        return false;
      }
      return true;
    });
    if (filters.length < 1) return null;

    return {
      abi: filters[0].get('abi'),
      address: filters[0].get('address'),
      name: filters[0].get('name'),
      chainId: filters[0].get('chainId'),
    };
  } catch (err) {
    logger.error(`getDeHubTokenContract error: ${JSON.stringify(err)}`);
  }
  return null;
}

async function getWhitelisted(): Promise<string[] | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubOTTDapp = Moralis.Object.extend(environment.dappName.ott);
    const query = new Moralis.Query(DeHubOTTDapp);
    const records = await query.first({ useMasterKey: true });
    if (!records) return null;

    const relation = records.relation('whitelisted');
    const users = await relation.query().find({ useMasterKey: true });
    return users.map(user => user.get('ethAddress'));
  } catch (err) {
    logger.error(`getWhitelisted error: ${JSON.stringify(err)}`);
  }
  return null;
}

/**
 * Get staked token amount of given wallet address.
 * @param {*} targetChainId network
 * @param {*} address user address
 */
async function getStakedAmount(
  targetChainId: ChainIdAsNumber,
  address: string
): Promise<typeof Moralis.Cloud.BigNumber | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = targetChainId;

    const web3 = Moralis.web3ByChain(decimalToHex(targetChainId));
    let amount = new Moralis.Cloud.BigNumber(0);

    const stakingContracts = (await getStakingContracts()) ?? [];

    for (let i = 0; i < stakingContracts.length; i++) {
      if (stakingContracts[i].chainId !== decTargetChainId) {
        continue;
      }

      // create contract instance
      const contract = new web3.eth.Contract(
        stakingContracts[i].abi,
        stakingContracts[i].address
      );

      // get user info
      const userInfo = await contract.methods.userInfo(address).call();
      amount = amount.plus(new Moralis.Cloud.BigNumber(userInfo.amount));
    }

    return amount;
  } catch (err) {
    logger.error(`getStakedAmount error: ${JSON.stringify(err)}`);
    return null;
  }
}

async function getOTTMinTokensToPlay(): Promise<
  typeof Moralis.Cloud.BigNumber | null
> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubOTTDapp = Moralis.Object.extend(environment.dappName.ott);
    const query = new Moralis.Query(DeHubOTTDapp);
    const config = await query.find();
    return config.length > 0
      ? new Moralis.Cloud.BigNumber(config[0].get('minTokensToPlay')).times(
          new Moralis.Cloud.BigNumber(100000)
        )
      : null;
  } catch (err) {
    logger.error(`getOTTMinTokensToPlay error: ${JSON.stringify(err)}`);
  }
  return null;
}

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
