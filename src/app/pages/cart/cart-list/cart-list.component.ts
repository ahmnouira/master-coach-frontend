import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { IStripe } from 'src/app/interfaces/stripe.interface';
import { Order } from 'src/app/models/order/order.model';
import { OrderService } from 'src/app/services/order-service/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent extends PageHelper<Order[]> implements OnInit {
  isSubmitting = false;
  email: string;

  redirectUrl = environment.APP_URL + '/pages/cart/paid';

  constructor(
    private orderService: OrderService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getOrders();
    this.getUserEmail();

    const stripe: IStripe = {
      email: this.email,
      id: 'cart',
      price: 20,
      title: 'Order Title',
    };
    this.initStripe(stripe);
  }

  getUserEmail() {
    this.authService.currentUser$.subscribe((user) => {
      this.email = user.email;
    });
  }

  getOrders() {
    this.data = this.orderService.getOrdersFromStorage();
    if (Array.isArray(this.data) && this.data) {
      this.onSuccess();
    } else {
      this.onError('');
    }
  }

  hasItems() {
    return Boolean(this.data && this.data.length);
  }

  handleDelete(id: string) {
    const filteredOrders = this.data.filter((el) => el._id !== id);
    this.data = [...filteredOrders];
    this.orderService.setOrders = filteredOrders;
    this.orderService.addOrdersToStorage(filteredOrders);
  }

  trackById(index: number, order: Order) {
    return order._id;
  }

  initStripe(data: IStripe) {
    // no need to stripe for free plan
    // if (this.isFreePlan) return;

    const scriptScript = this.document.getElementById(
      `stripe-script-${data.id}`
    );
    if (scriptScript) {
      scriptScript.remove();
    }

    let script = this.renderer.createElement('script') as HTMLScriptElement;
    // v2
    // script.src = "https://checkout.stripe.com/v2/checkout.js"
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.id = `stripe-script-${data.id}`;
    script.type = 'application/javascript';

    this.renderer.addClass(script, 'stripe-button');
    this.renderer.setAttribute(
      script,
      'data-key',
      environment.STRIPE_PUBLISHABLE_KEY
    );

    this.renderer.setAttribute(script, 'data-amount', data.price.toString());
    this.renderer.setAttribute(script, 'data-name', environment.APP_NAME);
    this.renderer.setAttribute(script, 'data-description', data.title);
    this.renderer.setAttribute(script, 'data-email', data.email);

    this.renderer.setAttribute(script, 'data-locale', 'auto');

    setTimeout(() => {
      const form = this.document.getElementById(
        `stripeForm-${data.id}`
      ) as HTMLFormElement;

      console.log('form', form, script);
      this.renderer.appendChild(form, script);
    }, 200);
  }

  onSubmit($event) {
    console.log('onSubmit');
    $event.preventDefault();
  }

  submit() {}
}
