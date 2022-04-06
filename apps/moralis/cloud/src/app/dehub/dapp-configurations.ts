import {
  bnbRewardDappName,
  DeHubTokenDecimals,
  ottDappName,
  stakingDappName,
  tokenDappName,
} from './configuration';
import {
  DeHubTokenContractPropsType,
  RewardContractPropsType,
  StakingContractPropsType,
  StakingControllerContractPropsType,
  SupportedNetwork,
} from './types';

/**
 * Get contract properties and address/abis
 * @returns array of contract, every contract has 4 common properties
 * they are: address, name, chainId, abi
 */
async function getDeHubContracts(dappName: string) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const Contracts = Moralis.Object.extend('Contracts');
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

export async function getDeHubTokenContract(
  targetChainId: SupportedNetwork
): Promise<DeHubTokenContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = parseInt(targetChainId, 16);

    const contracts = await getDeHubContracts(tokenDappName);
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

/**
 * Get staking contract address with chain id, controller contract should be
 * added into `contracts` table, and its name should be
 * `DeHub Staking Controller` and `chainId` should be decimal number.
 * @param {*} targetChainId
 * @returns object of abi and address
 */
export async function getStakingControllerContract(
  targetChainId: SupportedNetwork
): Promise<StakingControllerContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = parseInt(targetChainId, 16);

    const Contracts = Moralis.Object.extend('Contracts');
    const contractQuery = new Moralis.Query(Contracts);

    contractQuery.equalTo('name', 'DeHub Staking Controller');
    contractQuery.equalTo('chainId', decTargetChainId);
    const first = await contractQuery.first();
    if (first) {
      return {
        abi: first.get('abi'),
        address: first.get('address'),
        name: first.get('name'),
        chainId: first.get('chainId'),
      };
    }
  } catch (err) {
    logger.error(`getStakingControllerContract error: ${JSON.stringify(err)}`);
  }
  return null;
}

export async function getStakingContracts(): Promise<
  StakingContractPropsType[] | null
> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const contracts = await getDeHubContracts(stakingDappName);

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

export async function getActiveStakingContracts(
  targetChainId: SupportedNetwork
): Promise<StakingContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = parseInt(targetChainId, 16);

    const date = new Date();
    const contracts = await getDeHubContracts(stakingDappName);
    const filters = contracts.filter(contract => {
      const chainId = contract.get('chainId');
      if (parseInt(chainId) !== decTargetChainId) {
        return false;
      }

      const year = contract.get('year');
      const quarter = contract.get('quarter');
      if (
        date.getFullYear() !== year ||
        Math.floor((date.getUTCMonth() + 1) / 4) !== quarter - 1
      ) {
        return false;
      }
      return true;
    });

    if (filters.length < 1) return null;

    const year = filters[0].get('year');
    const quarter = filters[0].get('quarter');

    const contract = filters[0].get('contract');
    const address = contract.get('address');

    const name = contract.get('name');
    const chainId = contract.get('chainId');
    const abi = contract.get('abi');

    return {
      year,
      quarter,
      address,
      name,
      chainId,
      abi,
    };
  } catch (err) {
    logger.error(`getActiveStakingContracts error: ${JSON.stringify(err)}`);
  }
  return null;
}

export async function getRewardContract(
  targetChainId: SupportedNetwork
): Promise<RewardContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = parseInt(targetChainId, 16);

    const contracts = await getDeHubContracts(bnbRewardDappName);
    const filters = contracts.filter(contract => {
      const chainId = contract.get('chainId');
      if (parseInt(chainId) !== decTargetChainId) {
        return false;
      }
      return true;
    });

    if (filters.length < 1) return null;

    const address = filters[0].get('address');

    const name = filters[0].get('name');
    const chainId = filters[0].get('chainId');
    const abi = filters[0].get('abi');

    return {
      address,
      name,
      chainId,
      abi,
    };
  } catch (err) {
    logger.error(`getRewardContract error: ${JSON.stringify(err)}`);
  }
  return null;
}

export async function getOTTMinTokensToPlay(): Promise<
  typeof Moralis.Cloud.BigNumber | null
> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubOTTDapp = Moralis.Object.extend(ottDappName);
    const query = new Moralis.Query(DeHubOTTDapp);
    const config = await query.find();
    return config.length > 0
      ? new Moralis.Cloud.BigNumber(config[0].get('minTokensToPlay')).times(
          DeHubTokenDecimals
        )
      : null;
  } catch (err) {
    logger.error(`getOTTMinTokensToPlay error: ${JSON.stringify(err)}`);
  }
  return null;
}
