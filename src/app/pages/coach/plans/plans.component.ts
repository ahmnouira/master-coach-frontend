import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { PLANS, PLANS_YEARLY } from 'src/app/constants/plans';
import { Plan } from 'src/app/models/plan.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
 
  plans  =  PLANS

  isLoading: true

  selectedPlan: Plan;

  // monthly by default
  monthly = true;

  constructor(
   
  ) {}

  ngOnInit(): void {
    
  }

  changeOffer(event: any) {
    this.monthly = !this.monthly;
    if(this.monthly) {
      this.plans = PLANS
    } else {
      this.plans = PLANS_YEARLY
    }

    /*
    if (this.monthly) {
      this.plans[1].price = '29 euros HT';
      this.plans[2].price = '59 euros HT';
      this.plans[3].price = '150 euros HT';
    } else {
      this.plans[1].price = '19 euros HT';
      this.plans[2].price = '49 euros HT';
      this.plans[3].price = '140 euros HT';
    }*/
  }

  setSelectedPlan(plan: Plan) {
    this.selectedPlan = plan;
    console.log('selectedPlan', plan)
  
  }
}
