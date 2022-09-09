import { ICart, ICartItem } from 'src/app/interfaces/cart.interface';
import { Entity } from '../entity/entity.model';

export class Cart extends Entity implements ICart {
  title: string;
  items: ICartItem[];
}
