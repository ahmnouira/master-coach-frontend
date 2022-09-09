import { User } from '@twilio/conversations';
import { IOrder } from 'src/app/interfaces/order.interface';
import { Entity } from '../entity/entity.model';
import { Product } from '../product/product.model';

export class Order extends Entity implements IOrder {
  user: User;
  products: Product[];
  price: number;
  stripePaymentId: string;
}
