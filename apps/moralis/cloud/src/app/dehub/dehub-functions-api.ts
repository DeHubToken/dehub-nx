import { MoralisFunctions } from '@dehub/shared/model';
import { totalSupplyFn } from './dehub-functions';

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/totalSupply
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/totalSupply
 */
Moralis.Cloud.define(MoralisFunctions.Dehub.TotalSupply, totalSupplyFn);
