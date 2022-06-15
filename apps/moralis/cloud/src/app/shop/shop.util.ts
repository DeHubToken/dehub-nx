import { ShopContractPropsType } from '@dehub/shared/model';
import { environment } from '../../environments/environment';
import { ChainIdAsNumber, getDeHubContracts } from '../shared';

/**
 * Return the reward contract information, returning type is same with `ContractProperties`.
 * @param targetChainId
 * @returns
 */
export async function getCheckoutContract(
  targetChainId: ChainIdAsNumber
): Promise<ShopContractPropsType | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = targetChainId;

    const contracts = await getDeHubContracts(environment.dappName.shop);
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
    logger.error(`getCheckoutContract error: ${JSON.stringify(err)}`);
  }
  return null;
}
