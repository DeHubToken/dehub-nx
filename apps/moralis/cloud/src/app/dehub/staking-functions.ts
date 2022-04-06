import { defChainId } from './configuration';
import {
  getActiveStakingContracts,
  getRewardContract,
  getStakingContracts,
  getStakingControllerContract,
} from './dapp-configurations';

Moralis.Cloud.define('getStakingContracts', async () => {
  return await getStakingContracts();
});

Moralis.Cloud.define('getActiveStakingContracts', async () => {
  return await getActiveStakingContracts(defChainId);
});

Moralis.Cloud.define('getStakingControllerContract', async () => {
  return await getStakingControllerContract(defChainId);
});

Moralis.Cloud.define('getRewardContract', async () => {
  return await getRewardContract(defChainId);
});

export default Moralis;
