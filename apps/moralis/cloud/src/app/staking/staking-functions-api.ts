import { MoralisFunctions } from '@dehub/shared/model';
import {
  getActiveStakingContractFn,
  getRewardContractFn,
  getStakingContractsFn,
  getStakingControllerContractFn,
} from './staking-functions';

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getStakingContracts
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getStakingContracts
 */
Moralis.Cloud.define(
  MoralisFunctions.Staking.GetStakingContracts,
  getStakingContractsFn
);

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getActiveStakingContract
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getActiveStakingContract
 */
Moralis.Cloud.define(
  MoralisFunctions.Staking.GetActiveStakingContract,
  getActiveStakingContractFn
);

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getStakingControllerContract
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getStakingControllerContract
 */
Moralis.Cloud.define(
  MoralisFunctions.Staking.GetStakingControllerContract,
  getStakingControllerContractFn
);

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getRewardContract
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getRewardContract
 */
Moralis.Cloud.define(
  MoralisFunctions.Staking.GetRewardContract,
  getRewardContractFn
);
