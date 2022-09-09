import { Component, Input, OnInit } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { Cart } from 'src/app/models/cart/cart.model';
import { Product } from 'src/app/models/product/product.model';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-purchases-total',
  templateUrl: './purchases-total.component.html',
  styleUrls: ['./purchases-total.component.scss'],
})
export class PurchasesTotalComponent implements OnInit {
  @Input() products: Product[];

  @Input() id: string;

  isLoading: boolean;
  cart: Cart;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.cart = this.getCart(this.products);
  }

  generatePDF() {
    this.isLoading = true;
    this.orderService.generatePDF(this.id).subscribe(
      (res) => {
        console.log(typeof res);
        FileHelper.createFile(res as Blob, `order-${this.id}`);
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  getCart(products: Product[]): Cart {
    let cart: Cart = {
      items: [],
      title: 'Détails commande',
      _id: this.id,
    };
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
