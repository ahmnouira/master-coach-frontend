import { IProduct } from 'src/app/interfaces/product.interface';
import { Entity } from '../entity/entity.model';
import { ProductType } from './product-type.enum';

export class Product extends Entity implements IProduct {
  title: string;
  description: string;
  duration: string;
  type: ProductType;
  category: string;
  image: any;
  file: any;
  price?: string;
  isFree?: boolean;
  displayedInShop?: boolean;
}
