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

  isSubmitting  = false


  constructor(private orderService: OrderService) {
    super();
  }

  ngOnInit(): void {
    this.getOrders();
  }


  getOrders() {
      this.data =  this.orderService.getOrdersFromStorage()

      console.log('data', this.data)
      if(this.data && this.data.length) {
        this.onSuccess()
      
      } else {
        this.onError('')
      }
  }

  submit() {

  }
}
