import { environment } from '../../environments/environment';
import { getRewardContract } from '../shared/dapp.util';
import { ChainIdAsNumber } from '../shared/types';
import {
  getActiveStakingContracts,
  getStakingContracts,
  getStakingControllerContract,
} from '../staking/dapp.util';

Moralis.Cloud.define('getStakingContracts', async () => {
  return await getStakingContracts();
});

Moralis.Cloud.define('getActiveStakingContracts', async () => {
  return await getActiveStakingContracts(
    environment.web3.chainId as ChainIdAsNumber
  );
});

Moralis.Cloud.define('getStakingControllerContract', async () => {
  return await getStakingControllerContract(
    environment.web3.chainId as ChainIdAsNumber
  );
});

Moralis.Cloud.define('getRewardContract', async () => {
  return await getRewardContract(environment.web3.chainId as ChainIdAsNumber);
});

export default Moralis;
