import { totalCirculatingSupplyFn } from './dehub-functions';
import { DehubFunctions } from './dehub.model';

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/totalCirculatingSupply
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/totalCirculatingSupply
 */
Moralis.Cloud.define(
  DehubFunctions.TotalCirculatingSupply,
  totalCirculatingSupplyFn
);
