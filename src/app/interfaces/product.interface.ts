import { ProductType } from '../models/product/product-type.enum';

export interface IProduct {
  title: string;
  description: string;
  duration: string;
  type: ProductType | null;
  category: string;
  image: any;
  file: any;
  price?: string;
  isFree?: boolean;
  isDeleted?: boolean;
  displayedInShop?: boolean;
}
