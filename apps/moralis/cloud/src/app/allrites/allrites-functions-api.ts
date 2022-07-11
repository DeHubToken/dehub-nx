import { MoralisFunctions } from '@dehub/shared/model';
import { authAllritesFn } from './allrites-functions';

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/authAllrites
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/authAllrites
 */
Moralis.Cloud.define(MoralisFunctions.Allrites.Auth, authAllritesFn);
