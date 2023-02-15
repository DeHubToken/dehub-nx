import {
  InitOrderParams,
  MoralisFunctions,
  SalesAirdropParams,
  ShopOrdersParams,
} from '@dehub/shared/model';
import {
  checkOrder,
  getCheckoutContractFn,
  initOrder,
  salesAirdrop,
  shopOrders,
} from './shop-functions';

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/initOrder
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/initOrder
 */
Moralis.Cloud.define(MoralisFunctions.Shop.InitOrder, async request => {
  return initOrder(request.params as unknown as InitOrderParams);
});

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/checkOrder
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/checkOrder
 */
Moralis.Cloud.define(MoralisFunctions.Shop.CheckOrder, async request => {
  return checkOrder(request.params.orderId);
});

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/shopOrders?contentfulId=4dTd2flomcsa3bvyvO4X2N&orderStatus=verified
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/shopOrders?contentfulId=4dTd2flomcsa3bvyvO4X2N&orderStatus=verified
 */
Moralis.Cloud.define(MoralisFunctions.Shop.ShopOrders, async request => {
  return shopOrders(request.params as unknown as ShopOrdersParams);
});

/**
 * Dev:  https://nm6dir4me3i0.usemoralis.com:2053/server/functions/salesAirdrop?orderStatus=verified&aggregate=true
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/salesAirdrop?orderStatus=verified&aggregate=true
 */
Moralis.Cloud.define(MoralisFunctions.Shop.SalesAirdrop, async request => {
  return salesAirdrop(request.params as unknown as SalesAirdropParams);
});

/**
 * Dev: https://nm6dir4me3i0.usemoralis.com:2053/server/functions/getCheckoutContract
 * Prod: https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/getCheckoutContract
 */
Moralis.Cloud.define(
  MoralisFunctions.Shop.GetCheckoutContract,
  getCheckoutContractFn
);
