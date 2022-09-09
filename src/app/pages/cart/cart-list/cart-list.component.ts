import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { retry } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { getCartTotalPrice } from 'src/app/helpers/getPrice';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { ICart } from 'src/app/interfaces/cart.interface';
import { IStripe } from 'src/app/interfaces/stripe.interface';
import { Cart } from 'src/app/models/cart/cart.model';
import { Order } from 'src/app/models/order/order.model';
import { Product } from 'src/app/models/product/product.model';
import { OrderService } from 'src/app/services/order-service/order.service';
import { RouteService } from 'src/app/services/route-service/route.service';
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

  price: number;

  orders: Cart[] = [];

  constructor(
    private orderService: OrderService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getOrders();
    this.getUserEmail();

    this.getPrice();

    const stripe: IStripe = {
      email: this.email,
      id: 'cart',
      price: this.price,
      title: 'Acheter des produits',
    };
    this.initStripe(stripe);
  }

  getPrice() {
    try {
      this.price = getCartTotalPrice(this.data);
    } catch (error) {
      this.onError('error price');
    }
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
    this.isLoading = true;
    const filteredOrders = this.data.filter((el) => el._id !== id);
    this.data = [...filteredOrders];
    this.orderService.setOrders = filteredOrders;
    this.orderService.addOrdersToStorage(filteredOrders);
    this.routeService.reload();
  }

  trackById(_index: number, order: Order) {
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

  onSubmit(event) {
    event.preventDefault();
    console.log('onSubmit', event);
  }

  submit() {
    this.orderService.saveOrdersToSessionStorage(this.data.map((el) => el._id));
  }
}
