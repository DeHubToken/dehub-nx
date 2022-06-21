import Moralis from 'moralis/types';
import { PhysicalAddress } from './location.model';

/**
 * Moralis Class for DeHub Shop Shipping Addresses.
 */
export interface DeHubShopShippingAddresses extends Moralis.Object {
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
