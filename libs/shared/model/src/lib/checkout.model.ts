import { Asset, ProductCategory } from './website-contentful.model';

export interface ProductCheckoutDetail {
  picture: Asset;
  name: string;
  availableQuantity: number;
  category: ProductCategory;
  price: number;
  currency: string;
  contentfulId: string;
  sku: string;
}
