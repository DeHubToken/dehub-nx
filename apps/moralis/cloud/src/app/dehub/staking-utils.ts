import { stakingDappName } from './configuration';

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

export async function getStakingContracts() {
  const logger = Moralis.Cloud.getLogger();

  try {
    const contracts = (await getDeHubContracts(stakingDappName)) ?? [];

    const collect = [];
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
