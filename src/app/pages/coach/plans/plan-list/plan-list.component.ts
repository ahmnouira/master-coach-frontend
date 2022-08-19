import { Component, OnInit } from '@angular/core';
import { PLANS_MONTHLY, PLANS_ANNUAL } from 'src/app/constants/plans';
import { Plan } from 'src/app/models/plan.model';
import { PaymentService } from 'src/app/services/payment-service/payment.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent implements OnInit {
  plans = PLANS_ANNUAL;

  isLoading: true;

  selectedPlan: Plan;

  // monthly by default
  monthly = true;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {}

  changeOffer(event: any) {
    this.monthly = !this.monthly;
    if (this.monthly) {
      this.plans = PLANS_MONTHLY;
    } else {
      this.plans = PLANS_ANNUAL;
    }
  }

  setSelectedPlan(plan: Plan) {
    // this.paymentService.setSelectedPlan = plan;
    this.selectedPlan = plan;
    console.log('setSelectedPlan', this.selectedPlan)
    this.paymentService.saveSelectedPlan(this.selectedPlan)
  }
}
