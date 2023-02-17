import { ShopContractPropsType } from './contract.model';
import { DeHubShopShippingAddress } from './dehub-moralis.model';
import { PhysicalAddress } from './location.model';
import { User } from './moralis.model';

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

export type Currency = 'BNB' | 'DeHub' | 'BUSD';

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
  referralAddress?: string;
  productData: ProductData;
  shippingAddress: PhysicalAddress;
  contentfulId: string;
  quantity: number;
  totalAmount: number;
  currency: Currency;
}

export interface ShopOrdersParams {
  contentfulId: string;
  orderStatus: OrderStatus;
}

export interface SalesAirdropParams {
  aggregate: boolean;
  airdropFormat: boolean;
  orderStatus: OrderStatus;
}

export interface AirdropReferral {
  ethAddress: string;
  airdrop: number;
  nft: string;
}
export interface SalesAirdrop {
  userId: string;
  ethAddress: string;
  airdrop: number;
  referrals?: AirdropReferral[] | undefined;
  nft: string;
}

export interface SalesAirdropFormat {
  [key: string]: {
    address: string;
    amount: string;
  };
}

export interface ShopOrder<U = User> {
  objectId: string;
  ipfsHash: string;
  shippingAddress: DeHubShopShippingAddress;
  quantity: number;
  user: U;
  updatedAt: string;
  currency: Currency;
  status: OrderStatus;
  tokeId: number;
  referralAddress?: string;
  productName: string;
  createdAt: string;
  totalAmount: number;
  sku: string;
  imageIpfsHash: string;
  contentfulId: string;
}

export interface CheckOrderParams {
  orderId: string;
}

/**
 * Moralis Order initialization response result data.
 */
export interface InitOrderResult {
  orderId: string;
  ipfsHash: string;
}

export interface ShopOrdersResult {
  result: ShopOrder[];
}

export interface SalesAirdropResult {
  result: SalesAirdrop[];
}

export interface CheckOrderResult {
  status: OrderStatus;
}

/**
 * Moralis Order initialization response.
 */
export interface InitOrderResponse {
  result: InitOrderResult;
}

export interface CheckOrderResponse {
  result: CheckOrderResult;
}

export interface ShopContractResponse {
  result: ShopContractPropsType | null;
}
