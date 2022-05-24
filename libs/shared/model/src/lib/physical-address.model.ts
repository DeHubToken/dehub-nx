/**
 * Physical address model. User for shipping, billing, and other addresses.
 */
export interface PhysicalAddress {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  zip: string;
  state: string;
}
