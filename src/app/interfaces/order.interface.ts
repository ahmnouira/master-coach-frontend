import { User } from "@twilio/conversations";
import { Product } from "../models/product/product.model";

export interface IOrder {
    user: User, 
    products: Product[], 
    price: number, 
    stripePaymentId: string
}
