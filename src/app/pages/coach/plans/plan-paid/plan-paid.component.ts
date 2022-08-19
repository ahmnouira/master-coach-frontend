import { Component, OnInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { PLANS_ANNUAL } from 'src/app/constants/plans';
import { Plan } from 'src/app/models/plan.model';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-plan-paid',
  templateUrl: './plan-paid.component.html',
  styleUrls: ['./plan-paid.component.scss'],
})
export class PlanPaidComponent implements OnInit {
  isLoading: true;
  plan: Plan // = PLANS_ANNUAL[0];

  constructor(
    private routeService: RouteService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const params: ParamMap = this.routeService.getParams;
    this.plan = this.paymentService.getSelectedPlan;

    if(!this.plan) {


    }

    if (params.has('stripeToken')) {
      this.savePayment(params.get('stripeToken'));
    } else {
    }
  }

  savePayment(stripeToken: string) {
    this.paymentService.savePlan({
      planDescription: this.plan.title,
      planPrice: this.plan.price,
      stripeToken,
    });
  }
}
