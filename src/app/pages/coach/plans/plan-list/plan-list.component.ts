import { Component, OnInit } from '@angular/core';
import { PLANS_MONTHLY, PLANS_ANNUAL } from 'src/app/constants/plans';
import { Plan } from 'src/app/models/plan.model';

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

  constructor() {}

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
    this.selectedPlan = plan;
    console.log('selectedPlan', plan);
  }
}
