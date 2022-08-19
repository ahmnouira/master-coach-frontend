import {
  Component,
  Inject,
  Input,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Plan } from 'src/app/models/plan.model';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent implements OnInit {
  @Input() plan: Plan;

  script: HTMLScriptElement

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.initStripe()
  }

  initStripe() {

      this.script = this.renderer.createElement('script') as HTMLScriptElement;
      // v2
      // script.src = "https://checkout.stripe.com/v2/checkout.js"
      this.script.src = 'https://checkout.stripe.com/checkout.js';
      this.script.id = 'stripe-script'
      this.script.type = 'application/javascript';

      this.renderer.addClass(this.script, 'stripe-button');
      this.renderer.setAttribute(
        this.script,
        'data-key',
        environment.STRIPE_PUBLISHABLE_KEY
      );
      const price  = this.plan && this.plan.price ? this.plan.price : ''
      const title  = this.plan && this.plan.title ? this.plan.title : ''

      console.log('initStripe Runs with', price)

      this.renderer.setAttribute(this.script, 'data-amount', price);
      this.renderer.setAttribute(this.script, 'data-name', environment.APP_NAME);
      this.renderer.setAttribute(this.script, 'data-description', title);
      this.renderer.setAttribute(this.script, 'data-locale', 'auto');
      this.renderer.appendChild(
        this.document.getElementById('stripeForm'),
        this.script
      );

      setTimeout(() => {
        const button = this.document.getElementsByClassName(
          'stripe-button-el'
        )[0] as HTMLButtonElement;
        button.style.display = 'none';
      }, 500);
   
}

  ngOnChanges(changes: SimpleChanges) {

    console.log('ngOnChanges')

    if(this.script) {
        const el = this.document.getElementById('stripe-script') as HTMLScriptElement
        if(el)  {
          el.remove()
          console.info('script removed')
        }
        setTimeout(() => {
          this.initStripe()
          }, 1000)
    }

   
      /// this.initStripe();
    
  }
}
