import { environment } from '../../environments/environment';
import {
  ChainIdAsNumber,
  DeHubTokenContractPropsType,
  RewardContractPropsType,
} from './types';

/**
 * Get contract properties and address/abis
 * @returns array of contract, every contract has 4 common properties
 * they are: address, name, chainId, abi
 */
export async function getDeHubContracts(dappName: string) {
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

export async function getRewardContract(
  targetChainId: ChainIdAsNumber
): Promise<RewardContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = targetChainId;

    const contracts = await getDeHubContracts(environment.dappName.bnbReward);
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
