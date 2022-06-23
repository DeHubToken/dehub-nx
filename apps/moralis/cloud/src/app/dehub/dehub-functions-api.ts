import { MoralisFunctions } from '@dehub/shared/model';
import { totalCirculatingSupplyFn } from './dehub-functions';

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/totalCirculatingSupply
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/totalCirculatingSupply
 */
Moralis.Cloud.define(
  MoralisFunctions.Dehub.TotalCirculatingSupply,
  totalCirculatingSupplyFn
);
