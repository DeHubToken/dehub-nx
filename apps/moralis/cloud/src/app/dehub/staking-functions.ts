import { getStakingContracts } from './staking-utils';

Moralis.Cloud.define('getStakingContracts', async () => {
  return await getStakingContracts();
});

export default Moralis;
