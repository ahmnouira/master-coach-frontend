import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { getPrice } from 'src/app/helpers/getPrice';
import { Plan } from 'src/app/models/plan.model';
import { OrderService } from 'src/app/services/order-service/order.service';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-cart-paid',
  templateUrl: './cart-paid.component.html',
  styleUrls: ['./cart-paid.component.scss'],
})
export class CartPaidComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  plan: Plan;
  params: any;
  error = '';
  success = false;

  constructor(
    private routeService: RouteService,
    private orderService: OrderService,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.params = this.routeService.getQueryParams;
    // this.plan = this.orderService.getSavedSelectedPlan();
    if (!this.plan) {
      this.error = 'No plan is selected';
      this.success = false;
      this.isLoading = false;
      // this.routeService.location.back()
    }
  }

  ngAfterViewInit(): void {
    if (
      this.params['stripeToken'] &&
      this.params['stripeTokenType'] &&
      this.plan
    ) {
      this.savePayment(this.params['stripeToken']);
    } else {
      this.error = 'Invalid data';
      this.success = false;
      this.isLoading = false;
    }
  }

  savePayment(stripeToken: string) {
    this.orderService
      .addOrder({
        planDescription: this.plan.title.toLowerCase(),
        planPrice: getPrice(this.plan.price),
        stripeToken,
      })
      .subscribe(
        (res) => {
          this.authService.loggedInUser().subscribe(
            (userRes) => {
              console.log('userRes', userRes);

              if (!userRes.success) {
                return;
              }
              this.tokenService.saveUser(userRes.data);
              this.authService.currentUser$.next(userRes.data);
            },
            (err) => {
              console.error('loggedInUserError', err);
            }
          );

          console.log('res:', res, res.success, res.message);
          // this.paymentService.clearSelectedPlan();
          this.success = true;
          this.isLoading = false;
        },
        (error: any) => {
          this.error = error;
          this.isLoading = false;
          this.success = false;
        }
      );
  }
}
