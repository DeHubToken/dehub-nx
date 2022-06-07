import { InitOrderParams } from '@dehub/shared/model';
import { checkOrder, initOrder } from './shop-functions';
import { ShopFunctions } from './shop.model';

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/initOrder
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/initOrder
 */
Moralis.Cloud.define(ShopFunctions.InitOrder, async request => {
  return initOrder(request.params as unknown as InitOrderParams);
});

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/checkOrder
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/checkOrder
 */
Moralis.Cloud.define(ShopFunctions.CheckOrder, async request => {
  return checkOrder(request.params.orderId);
});
