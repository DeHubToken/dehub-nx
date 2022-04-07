import { environment } from '../../environments/environment';
import { getDeHubContracts } from '../shared/dapp.util';
import {
  ChainIdAsNumber,
  StakingContractPropsType,
  StakingControllerContractPropsType,
} from '../shared/types';

/**
 * Get staking contract address with chain id, controller contract should be
 * added into `contracts` table, and its name should be
 * `DeHub Staking Controller` and `chainId` should be decimal number.
 * @param {*} targetChainId
 * @returns object of abi and address
 */
export async function getStakingControllerContract(
  targetChainId: ChainIdAsNumber
): Promise<StakingControllerContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = targetChainId;

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

export async function getActiveStakingContracts(
  targetChainId: ChainIdAsNumber
): Promise<StakingContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = targetChainId;

    const date = new Date();
    const contracts = await getDeHubContracts(environment.dappName.staking);
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
