import { PhysicalAddress } from './physical-address.model';

// All Moralis DB classes return these default fields
export interface MoralisClassBase {
  className: string;
  id: string;
  _objCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// All Moralis DB class "attribute" fields include these default fields
export interface MoralisClassAttributes {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Moralis Class response interface.
 * Naming matches exactly the name of the Class on Moralis.
 * "attributes" is where the class-specific fields are stored.
 */
export interface DeHubShopShippingAddresses extends MoralisClassBase {
  attributes: PhysicalAddress & MoralisClassAttributes;
}
