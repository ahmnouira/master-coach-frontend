import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
  Inject,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';
import {
  FREE_ANNUAL_PLAN_ID,
  FREE_MONTHLY_PLAN_ID,
} from 'src/app/constants/plans';
import { getPrice } from 'src/app/helpers/getPrice';
import { Plan } from 'src/app/models/plan.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
})
export class PlanCardComponent implements OnInit, AfterViewInit {
  @Input() plan: Plan;

  @Input() email: string;

  @Output() onClick: EventEmitter<Plan> = new EventEmitter<Plan>();

  form: any;

  redirectUrl = environment.APP_URL + '/pages/coach/plans/paid';

  isFreePlan: boolean;

  //http://localhost:5000/pages/coach/plan/paid?stripeToken=tok_1LYS0uA1THLgkj123FcjOzzx&stripeTokenType=card&stripeEmail=ahmnouira%40gmail.com

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngAfterViewInit(): void {
    this.removeButton();
  }

  ngOnInit(): void {
    this.isFreePlan =
      this.plan.id === FREE_MONTHLY_PLAN_ID ||
      this.plan.id === FREE_ANNUAL_PLAN_ID;
    this.initStripe(this.plan);
  }

  initStripe(plan: Plan) {
    // no need to stripe for free plan
    if (this.isFreePlan) return;

    const scriptScript = this.document.getElementById(
      `stripe-script-${plan.id}`
    );
    if (scriptScript) {
      scriptScript.remove();
    }

    let script = this.renderer.createElement('script') as HTMLScriptElement;
    // v2
    // script.src = "https://checkout.stripe.com/v2/checkout.js"
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.id = `stripe-script-${plan.id}`;
    script.type = 'application/javascript';

    this.renderer.addClass(script, 'stripe-button');
    this.renderer.setAttribute(
      script,
      'data-key',
      environment.STRIPE_PUBLISHABLE_KEY
    );

    this.renderer.setAttribute(
      script,
      'data-amount',
      getPrice(this.plan.price, 100).toString()
    );
    this.renderer.setAttribute(script, 'data-name', environment.APP_NAME);
    this.renderer.setAttribute(script, 'data-description', plan.title);
    this.renderer.setAttribute(script, 'data-email', this.email);
    this.renderer.setAttribute(script, 'data-currency', 'eur');

    this.renderer.setAttribute(script, 'data-locale', 'auto');

    setTimeout(() => {
      const form = this.document.getElementById(
        `stripeForm-${this.plan.id}`
      ) as HTMLFormElement;
      this.renderer.appendChild(form, script);
    });
  }

  removeButton() {
    setTimeout(() => {
      const button = this.document.querySelector(
        '.stripe-button-el'
      ) as HTMLButtonElement;
      if (button) {
        button.remove();
      }
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plan.currentValue) {
    }
  }

  onSubmit($event: any) {
    $event.preventDefault();
  }

  handleClick() {
    //stripeToken=tok_1LYFyzA1THLgkj12uOvcftIg&stripeTokenType=card&stripeEmail=ahmnouira%40gmail.com
    console.log('form', this.form);
    this.onClick.emit(this.plan);
  }
}
