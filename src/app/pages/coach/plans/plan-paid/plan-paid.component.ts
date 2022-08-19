import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan.model';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { RouteService } from 'src/app/services/route-service/route.service';

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
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.params = this.routeService.getParams;
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
      console.log(
        this.plan.title.toLowerCase(),
        parseInt(this.plan.price.replace(' euros HT', ''))
      );

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
        planPrice: parseInt(this.plan.price.replace(' euros HT', '')),
        stripeToken,
      })
      .subscribe(
        (res) => {
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
