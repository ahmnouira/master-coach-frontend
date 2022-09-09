import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Order } from 'src/app/models/order/order.model';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-purchases-view',
  templateUrl: './purchases-view.component.html',
  styleUrls: ['./purchases-view.component.scss']
})
export class PurchasesViewComponent extends PageHelper<Order> implements OnInit {


  id: string = '';

 
  constructor(

    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    super()

   }

  ngOnInit(): void {
    this.getId();
    this.getOrder();
  }

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getOrder() {
    this.getData(this.orderService.getOrder(this.id), {
      debug: true,
    });
  }

}
