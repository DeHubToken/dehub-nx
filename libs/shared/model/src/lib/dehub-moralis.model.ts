import Moralis from 'moralis-v1/types';
import { PhysicalAddress } from './location.model';
import { ShopOrder } from './shop.model';

/**
 * Moralis Class for DeHub Shop Shipping Addresses.
 */
export type DeHubShopShippingAddress = Moralis.Object<
  Moralis.Attributes & PhysicalAddress
>;

/**
 * Moralis Class for DeHub Shop Orders.
 */
export type DeHubShopOrder = Moralis.Object<Moralis.Attributes & ShopOrder>;

/**
 * Moralis MongoDB Class Names for DeHub
 */
export enum MoralisClass {
  Contracts = 'Contracts',

  // Shop
  DeHubShopOrders = 'DeHubShopOrders',
  DeHubShopShippingAddresses = 'DeHubShopShippingAddresses',
}

/**
 * Moralis Functions for DeHub
 */
export const MoralisFunctions = {
  Dehub: {
    TotalSupply: 'totalSupply',
  },
  Shop: {
    InitOrder: 'initOrder',
    CheckOrder: 'checkOrder',
    ShopOrders: 'shopOrders',
    GetCheckoutContract: 'getCheckoutContract',
  },
  Staking: {
    GetStakingContracts: 'getStakingContracts',
    GetActiveStakingContract: 'getActiveStakingContract',
    GetStakingControllerContract: 'getStakingControllerContract',
    GetRewardContract: 'getRewardContract',
  },
};
