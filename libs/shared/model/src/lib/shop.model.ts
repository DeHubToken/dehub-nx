import { ShopContractPropsType } from './contract.model';
import { PhysicalAddress } from './location.model';

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

// For accessing env.web3.addresses.contracts
export enum CurrencyContractString {
  BNB = 'wbnb',
  DeHub = 'dehub',
  BUSD = 'busd',
}

/**
 * A set of product values required for Order initialization on Moralis.
 */
export interface ProductData {
  name: string;
  description: string;
  category: string;
  image: string;
  sku: string;
}

/**
 * Moralis Order initialization parameters.
 * 'productData' and 'shippingAddress' can be parsed objects used in frontend.
 * Or a stringified object if received via API request by the cloud function.
 */
export interface InitOrderParams {
  address: string;
  productData: ProductData;
  shippingAddress: PhysicalAddress;
  contentfulId: string;
}

/**
 * Moralis Order initialization response result data.
 */
export interface InitOrderResult {
  orderId: string;
  ipfsHash: string;
}

/**
 * Moralis Order initialization response.
 */
export interface InitOrderResponse {
  result: InitOrderResult;
}

export interface ShopContractResponse {
  result: ShopContractPropsType;
}
