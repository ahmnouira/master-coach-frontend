import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { IStripe } from 'src/app/interfaces/stripe.interface';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent implements OnInit {
  @Input() stripe: IStripe;

  @Input() url: string = '';

  script: HTMLScriptElement;

  redirectUrl: string;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    console.log('Stripe', this.stripe);
    this.initStripe(this.stripe);
    this.redirectUrl = environment.APP_URL + this.url;
  }

  initStripe(stripe: IStripe) {
    if (stripe.render) {
      return;
    }
    const scriptScript = this.document.getElementById(
      `stripe-script-${stripe.id}`
    );
    if (scriptScript) {
      scriptScript.remove();
    }

    let script = this.renderer.createElement('script') as HTMLScriptElement;
    // v2
    // script.src = "https://checkout.stripe.com/v2/checkout.js"
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.id = `stripe-script-${stripe.id}`;
    script.type = 'application/javascript';

    this.renderer.addClass(script, 'stripe-button');
    this.renderer.setAttribute(
      script,
      'data-key',
      environment.STRIPE_PUBLISHABLE_KEY
    );

    this.renderer.setAttribute(script, 'data-amount', stripe.price.toString());
    this.renderer.setAttribute(script, 'data-name', environment.APP_NAME);
    this.renderer.setAttribute(script, 'data-description', stripe.title);
    this.renderer.setAttribute(script, 'data-email', stripe.email);

    this.renderer.setAttribute(script, 'data-locale', 'auto');
  }

  onSubmit($event) {
    console.log('onSubmit');
    $event.preventDefault();
  }
}
