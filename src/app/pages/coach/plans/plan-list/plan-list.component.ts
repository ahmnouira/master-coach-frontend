import { Component, OnInit } from '@angular/core';
import { PLANS_MONTHLY, PLANS_ANNUAL } from 'src/app/constants/plans';
import { AuthService } from 'src/app/core/auth.service';
import { Plan } from 'src/app/models/plan.model';
import { PaymentService } from 'src/app/services/payment-service/payment.service';

type Form = {
  subscriptionPeriod: SubscriptionPeriod;
};

type SubscriptionPeriod = 'yearly' | 'monthly';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent implements OnInit {
  plans = PLANS_MONTHLY;
  isLoading: true;
  selectedPlan: Plan;

  subscriptionType: string;
  subscriptionPeriod: string;

  expires: string | number;
  userEmail: string;

  monthly = true;

  form: Form = {
    subscriptionPeriod: 'monthly',
  };

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (
        user &&
        user.email &&
        user.subscriptionPeriod &&
        user.subscriptionType &&
        user.subscriptionEnd
      ) {
        this.userEmail = user.email;
        this.subscriptionType = user.subscriptionType;
        this.subscriptionPeriod =
          user.subscriptionPeriod === 'monthly'
            ? 'Mensuel'
            : user.subscriptionPeriod === 'yearly'
            ? 'Annuel'
            : '';
        const difference =
          new Date(user.subscriptionEnd).getTime() - new Date().getTime();
        if (difference < 0) {
          this.expires = `Plan is expired`;
          this.subscriptionPeriod = undefined;
          this.subscriptionType = '';
          return;
        }
        const days = Math.ceil(difference / (1000 * 3600 * 24));
        this.expires = days > 1 ? `${days} jours` : `${days} jour`;
      } else {
        this.subscriptionType = 'Offre libre';
        this.expires = 'Expire dans : 30 jours';
      }
    });
  }

  changeOffer(event: SubscriptionPeriod) {
    this.monthly = !this.monthly;
    if (event === 'monthly') {
      this.plans = PLANS_MONTHLY;
    } else if (event === 'yearly') {
      this.plans = PLANS_ANNUAL;
    }
  }

  setSelectedPlan(plan: Plan) {
    this.selectedPlan = plan;
    this.paymentService.saveSelectedPlan(this.selectedPlan);
  }
}
