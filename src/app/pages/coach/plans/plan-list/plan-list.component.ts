import { Component, OnInit } from '@angular/core';
import { PLANS_MONTHLY, PLANS_ANNUAL } from 'src/app/constants/plans';
import { AuthService } from 'src/app/core/auth.service';
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

  subscriptionType: string;
  subscriptionPeriod: 'yearly' | 'monthly';

  expires: string | number;
  userEmail: string;

  monthly = true;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.subscriptionType = user.subscriptionType ?? 'free';
        this.subscriptionPeriod = user.subscriptionPeriod;
        if (user.subscriptionEnd) {
          const difference =
            new Date(user.subscriptionEnd).getTime() - new Date().getTime();
          if (difference < 0) {
            this.expires = `Plan is expired`;
            return;
          }
          const days = Math.ceil(difference / (1000 * 3600 * 24));
          this.expires = days > 1 ? `${days} jours` : `${days} jour`;
        } else {
          this.expires = 'No expire its free';
        }
      }
    });
  }

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
    console.log('setSelectedPlan', this.selectedPlan);
    this.paymentService.saveSelectedPlan(this.selectedPlan);
  }
}
