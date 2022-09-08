import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { PaymentService } from 'src/app/services/payment-service/payment.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent extends PageHelper implements OnInit {
  constructor(private paymentService: PaymentService) {
    super();
  }

  ngOnInit(): void {
    //  this.getServices();
  }

  /*
  getServices() {
    this.getData(this.paymentService.({ all: false }), {
      debug: true,
    });
  }

  */
}
