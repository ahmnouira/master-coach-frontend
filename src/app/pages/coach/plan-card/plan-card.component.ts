import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, Renderer2, Inject, AfterViewInit, SimpleChange, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Plan } from 'src/app/models/plan.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
})
export class PlanCardComponent implements OnInit, AfterViewInit {
  @Input() plan: Plan;

  @Output() onClick: EventEmitter<Plan> = new EventEmitter<Plan>();

  form: any

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngAfterViewInit(): void {
    this.removeButton()
  }

  ngOnInit(): void {
    this.initStripe(this.plan)
  }
 
  initStripe(plan: Plan) {

      console.log('price', plan.price)
      const scriptScript = this.document.getElementById(`stripe-script-${plan.id}`,)
      if(scriptScript) {
        console.log('found', scriptScript)
        scriptScript.remove()
        setTimeout(() => {}, 1000)
      }

      let script = this.renderer.createElement('script') as HTMLScriptElement;
      // v2
      // script.src = "https://checkout.stripe.com/v2/checkout.js"
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.id = `stripe-script-${plan.id}`
      script.type = 'application/javascript';

      this.renderer.addClass(script, 'stripe-button');


     
      this.renderer.setAttribute(
        script,
        'data-key',
        environment.STRIPE_PUBLISHABLE_KEY
      );
      
      this.renderer.setAttribute(script, 'data-amount', plan.price);
      this.renderer.setAttribute(script, 'data-name', environment.APP_NAME);
      this.renderer.setAttribute(script, 'data-description', plan.title);
      this.renderer.setAttribute(script, 'data-locale', 'auto');
     
      setTimeout(() => {
        const form  = this.document.getElementById(`stripeForm-${this.plan.id}`) as HTMLFormElement
        this.renderer.appendChild(
          form,
          script
        );
      });
  }

  removeButton()  {
    setTimeout(() => {
      const button = this.document.querySelector('.stripe-button-el') as HTMLButtonElement
      if(button) {
        button.remove()
      }
    }, 100)
 
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.plan.currentValue) {
    
    }
    
}


  onSubmit($event) {
    console.log('onSubmit')
    $event.preventDefault();
    console.log('form', this.form)

  }

  handleClick() {
    //stripeToken=tok_1LYFyzA1THLgkj12uOvcftIg&stripeTokenType=card&stripeEmail=ahmnouira%40gmail.com
    console.log('form', this.form)
    this.onClick.emit(this.plan);
  }
}
