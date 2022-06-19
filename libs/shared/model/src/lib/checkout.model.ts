import { CurrencyString } from './shop.model';
import { Asset, ProductCategory } from './website-contentful.model';

export interface ProductCheckoutDetail {
  picture: Asset;
  name: string;
  description: string;
  availableQuantity: number;
  category: ProductCategory;
  price: number;
  currency: CurrencyString;
  contentfulId: string;
  sku: string;
}
