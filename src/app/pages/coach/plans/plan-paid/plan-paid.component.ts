import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { getPrice } from 'src/app/helpers/getPrice';
import { Plan } from 'src/app/models/plan.model';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-plan-paid',
  templateUrl: './plan-paid.component.html',
  styleUrls: ['./plan-paid.component.scss'],
})
export class PlanPaidComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  plan: Plan;
  params: any;
  errorMessage = '';
  success = false;

  constructor(
    private routeService: RouteService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.params = this.routeService.getQueryParams;
    this.plan = this.paymentService.getSavedSelectedPlan();
    if (!this.plan) {
      this.errorMessage = 'No plan is selected';
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
      this.errorMessage = 'Invalid data';
      this.success = false;
      this.isLoading = false;
    }
  }

  savePayment(stripeToken: string) {
    this.paymentService
      .savePlan({
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
          this.paymentService.clearSelectedPlan();
          this.success = true;
          this.isLoading = false;
        },
        (error: any) => {
          this.errorMessage = error;
          this.isLoading = false;
          this.success = false;
        }
      );
  }
}
