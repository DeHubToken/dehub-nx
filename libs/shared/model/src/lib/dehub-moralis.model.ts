import Moralis from 'moralis/types';
import { PhysicalAddress } from './physical-address.model';

// All Moralis DB class "attribute" fields include these default fields
export interface MoralisCommonAttributes {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Moralis Class response interface.
 * Naming matches exactly the name of the Class on Moralis.
 * "attributes" is where the class-specific fields are stored.
 */
export interface DeHubShopShippingAddresses extends Moralis.Object {
  attributes: PhysicalAddress & MoralisCommonAttributes;
}
