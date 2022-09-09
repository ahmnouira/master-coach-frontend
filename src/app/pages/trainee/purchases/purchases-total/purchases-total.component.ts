import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart/cart.model';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-purchases-total',
  templateUrl: './purchases-total.component.html',
  styleUrls: ['./purchases-total.component.scss'],
})
export class PurchasesTotalComponent implements OnInit {
  @Input() products: Product[];

  cart: Cart;

  constructor() {}

  ngOnInit(): void {
    this.cart = this.getCart(this.products);
  }

  getCart(products: Product[]): Cart {
    let cart: Cart;
    for (let index = 0; index < products.length; index++) {
      const p = products[index];
      cart.items.push({
        category: p.category,
        price: parseInt(p.price),
        type: p.type,
      });
    }
    return cart;
  }
}
