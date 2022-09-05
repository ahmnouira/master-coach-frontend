import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent extends PageHelper implements OnInit {
  constructor(private orderService: OrderService) {
    super();
  }

  ngOnInit(): void {
    this.getOrders();
  }


  getOrders() {
    this.getData(this.orderService.orders, {
      debug: true
    })
  }
}
