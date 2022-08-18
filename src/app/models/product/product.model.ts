import { IProduct } from 'src/app/interfaces/product.interface';
import { Entity } from '../entity/entity.model';
import { ProductType } from './product-type.enum';

export class Product extends Entity implements IProduct {
  title: string;
  description: string;
  duration?: number;
  type: ProductType;
  category?: string;
  price: string;
  isFree?: boolean;
  displayedInShop?: boolean;
  image?: any;
  files?: any[];
}
