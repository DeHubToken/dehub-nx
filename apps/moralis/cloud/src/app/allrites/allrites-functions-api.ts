import { authAllritesFn } from './allrites-functions';
import { AllritesFunctions } from './allrites.model';

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/authAllrites
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/authAllrites
 */
Moralis.Cloud.define(AllritesFunctions.AuthAllrites, authAllritesFn);
