import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order/order.model';
import { OrderService } from 'src/app/services/order-service/order.service';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  orders: Order[];

  constructor(
    private orderService: OrderService,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  handleClick() {
    this.routeService.navigate(['/pages/cart']);
  }

  getOrders() {
    this.orderService.orders.subscribe((orders) => {

      console.log('orders', orders )
      this.orders = orders;
    });
  }
}
