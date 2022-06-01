/**
 * Physical address model. User for shipping, billing, and other addresses.
 */
export interface PhysicalAddress {
  name: string;
  line1: string;
  line2: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
}
