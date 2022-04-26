import { getRewardContractFn } from '.';
import {
  getActiveStakingContractFn,
  getStakingContractsFn,
  getStakingControllerContractFn,
} from './staking-functions';
import { StakingFunctions } from './staking.model';

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getStakingContracts
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getStakingContracts
 */
Moralis.Cloud.define(
  StakingFunctions.GetStakingContracts,
  getStakingContractsFn
);

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getActiveStakingContract
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getActiveStakingContract
 */
Moralis.Cloud.define(
  StakingFunctions.GetActiveStakingContract,
  getActiveStakingContractFn
);

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getStakingControllerContract
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getStakingControllerContract
 */
Moralis.Cloud.define(
  StakingFunctions.GetStakingControllerContract,
  getStakingControllerContractFn
);

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getRewardContract
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getRewardContract
 */
Moralis.Cloud.define(StakingFunctions.GetRewardContract, getRewardContractFn);
