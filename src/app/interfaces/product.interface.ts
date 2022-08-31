import { ProductType } from '../models/product/product-type.enum';

export interface IProduct {
  title: string;
  description: string;
  duration: string;
  type: ProductType | null;
  category: string;
  image: any;
  files: any;
  price?: string;
  isFree?: boolean;
  displayedInShop?: boolean;
 
}
