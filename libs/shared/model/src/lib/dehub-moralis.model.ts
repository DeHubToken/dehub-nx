import Moralis from 'moralis/types';
import { PhysicalAddress } from './location.model';

/**
 * Moralis Class for DeHub Shop Shipping Addresses.
 */
export interface DeHubShopShippingAddress extends Moralis.Object {
  attributes: PhysicalAddress;
}

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
  Allrites: {
    Auth: 'authAllrites',
  },
  Dehub: {
    TotalCirculatingSupply: 'totalCirculatingSupply',
  },
  Shop: {
    InitOrder: 'initOrder',
    CheckOrder: 'checkOrder',
    GetCheckoutContract: 'getCheckoutContract',
  },
  Staking: {
    GetStakingContracts: 'getStakingContracts',
    GetActiveStakingContract: 'getActiveStakingContract',
    GetStakingControllerContract: 'getStakingControllerContract',
    GetRewardContract: 'getRewardContract',
  },
};
