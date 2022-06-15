import { PhysicalAddress } from './location.model';

/**
 * A set of product values required for Order initialization on Moralis.
 */
export interface ProductData {
  name: string;
  picture: string;
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
 * Moralis Order initialization response.
 */
export interface InitOrderResponse {
  result: {
    ipfsHash: string;
    orderId: string;
  };
}
