import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Order } from 'src/app/models/order/order.model';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent extends PageHelper<Order[]> implements OnInit {
  isSubmitting = false;

  constructor(private orderService: OrderService) {
    super();
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.data = this.orderService.getOrdersFromStorage();
    if (Array.isArray(this.data) && this.data) {
      this.onSuccess();
    } else {
      this.onError('');
    }
  }

  hasItems() {
    return Boolean(this.data && this.data.length);
  }

  handleDelete(id: string) {
    const filteredOrders = this.data.filter((el) => el._id !== id);
    this.data = [...filteredOrders];
    this.orderService.setOrders = filteredOrders;
    this.orderService.addOrdersToStorage(filteredOrders);
  }

  trackById(index: number, order: Order) {
    return order._id;
  }

  submit() {}
}
