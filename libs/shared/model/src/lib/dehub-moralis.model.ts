import Moralis from 'moralis/types';
import { PhysicalAddress } from './location.model';
import { User } from './moralis.model';
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
export type DeHubShopOrder<U = User> = Moralis.Object<
  Moralis.Attributes & ShopOrder<U>
>;

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
    SalesAirdrop: 'salesAirdrop',
    GetCheckoutContract: 'getCheckoutContract',
  },
  Staking: {
    GetStakingContracts: 'getStakingContracts',
    GetActiveStakingContract: 'getActiveStakingContract',
    GetStakingControllerContract: 'getStakingControllerContract',
    GetRewardContract: 'getRewardContract',
  },
};

export interface AmountByChain {
  bsc: number;
  eth: number;
  polygon: number;
}

export interface Stats {
  totalSupply: AmountByChain;
  totalBurned: AmountByChain;
  activeSupply: AmountByChain;
}
