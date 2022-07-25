import { Currency } from './shop.model';
import {
  Asset,
  ProductCategory,
  SysFragment,
} from './website-contentful.model';

export interface ProductCheckoutDetail {
  sys: SysFragment;
  picture: Asset;
  name: string;
  description: string;
  availableQuantity: number;
  category: ProductCategory;
  price: number;
  currency: Currency;
  contentfulId: string;
  sku: string;
}
