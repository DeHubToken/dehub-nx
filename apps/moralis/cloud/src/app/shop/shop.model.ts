export enum ShopFunctions {
  InitOrder = 'initOrder',
  CheckOrder = 'checkOrder',
}

export enum OrderStatus {
  ipfsUploading = 'ipfsUploading',
  verifying = 'verifying',
  ipfsFailed = 'ipfsFailed',
  verified = 'verified',
}

export enum ReceiptStatus {
  'pending',
  'invalid',
  'shipped',
  'not-delivered',
  'delivered',
}

export enum Currency {
  BNB,
  DeHub,
  BUSD,
}

export enum CurrencyString {
  BNB = 'BNB',
  DeHub = 'DeHub',
  BUSD = 'BUSD',
}

export interface ProductData {
  picture: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: number;
  deliveryCountry: string; // todo, require to add column on Moralis
  price: string; // todo, require to add column on Moralis
  currency: string; // todo, require to add column on Moralis
  sku: string;
  availableQuantity: number;
}

export interface ShippingAddress {
  city: string;
  state: string;
  country: string;
  postalCode: string;
  line1: string;
  line2: string;
  name: string;
}

export interface InitOrderReturns {
  ipfsHash: string;
  orderId: string;
}
