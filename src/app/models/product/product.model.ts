import { IProduct } from "src/app/interfaces/product.interface";
import { Entity } from "../entity/entity.model";
import { ProductType } from "./product-type.enum";

export class Product extends Entity implements IProduct  {
  type: ProductType;
  title: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  isFree?: boolean;
  displayedInShop?: boolean;
  image: any;
  files: any[];
}



