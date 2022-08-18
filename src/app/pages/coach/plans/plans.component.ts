import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { PLANS } from 'src/app/constants/plans';
import { Plan } from 'src/app/models/plan.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  plans: Plan[] = PLANS;

  selectedPlan: Plan;

  // monthly by default
  monthly = true;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    
  }

  initStripe(plan: Plan) {
      const scriptScript = this.document.getElementById('stripe-script')
      if(scriptScript) {
        scriptScript.remove()
        setTimeout(() => {}, 1000)
      }

      let script = this.renderer.createElement('script') as HTMLScriptElement;
      // v2
      // script.src = "https://checkout.stripe.com/v2/checkout.js"
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.id = 'stripe-script'
      script.type = 'application/javascript';

      this.renderer.addClass(script, 'stripe-button');
      this.renderer.setAttribute(
        script,
        'data-key',
        environment.STRIPE_PUBLISHABLE_KEY
      );
      

      console.log('initStripe Runs with', plan.price)

      this.renderer.setAttribute(script, 'data-amount', plan.price);
      this.renderer.setAttribute(script, 'data-name', environment.APP_NAME);
      this.renderer.setAttribute(script, 'data-description', plan.title);
      this.renderer.setAttribute(script, 'data-locale', 'auto');
      this.renderer.appendChild(
        this.document.getElementById('stripeForm'),
        script
      );

      setTimeout(() => {
        const button = this.document.getElementsByClassName(
          'stripe-button-el'
        )[0] as HTMLButtonElement;
        button.style.display = 'none';
      }, 500);
}

  changeOffer(event: any) {
    this.monthly = !this.monthly;
    if (this.monthly) {
      this.plans[1].price = '29 euros HT';
      this.plans[2].price = '59 euros HT';
      this.plans[3].price = '150 euros HT';
    } else {
      this.plans[1].price = '19 euros HT';
      this.plans[2].price = '49 euros HT';
      this.plans[3].price = '140 euros HT';
    }
  }

  setSelectedPlan(plan: Plan) {
    this.selectedPlan = plan;
    console.log('selectedPlan', plan)
    this.initStripe(plan)
   
  }
}
