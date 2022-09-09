import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseHelper } from 'src/app/helpers/BaseHelper';
import { Product } from 'src/app/models/product/product.model';
import { OrderService } from 'src/app/services/order-service/order.service';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-cart-paid',
  templateUrl: './cart-paid.component.html',
  styleUrls: ['./cart-paid.component.scss'],
})
export class CartPaidComponent
  extends BaseHelper
  implements OnInit, AfterViewInit
{
  products: string[];
  params: any;
  data: Product[];

  constructor(
    private routeService: RouteService,
    private orderService: OrderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.params = this.routeService.getQueryParams;
    this.products = this.orderService.getOrdersFromSessionStorage();
    if (!this.products) {
      this.onError('No Orders are selected');
    }
  }

  back(): void {
    this.routeService.back();
  }

  ngAfterViewInit(): void {
    if (
      this.params['stripeToken'] &&
      this.params['stripeTokenType'] &&
      this.products
    ) {
      this.saveOrder(this.params['stripeToken']);
    } else {
      this.onError('Invalid data');
    }
  }

  clear() {
    this.orderService.clearOrdersFormStorage();
    this.orderService.clearOrdersFromSessionStorage();
  }

  saveOrder(stripeToken: string) {
    console.log(this.products, stripeToken);
    this.orderService
      .addOrder({
        products: this.products,
        stripeToken,
      })
      .subscribe(
        (res) => {
          if (!res.success) {
            this.onError(res.error);
            return;
          }

          console.log(res.data);
          this.data = res.data.products;
          this.clear();
          this.success = true;
          this.error = '';
          this.isLoading = false;
        },
        (error) => {
          this.onError(error);
        }
      );
  }
}
