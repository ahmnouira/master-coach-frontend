import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { IUser } from 'src/app/interfaces/user-interface';
import { Product } from 'src/app/models/product/product.model';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss'],
})
export class LibraryViewComponent
  extends PageHelper<Product>
  implements OnInit
{
  id: string = '';

  coach: Partial<IUser> = {};

  isSubmitting: boolean;

  orderExist: boolean;
  freeOrder: boolean

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) {
    super();
  }
  

  ngOnInit(): void {
    this.getId();
    this.getProduct();
    this.orderExist = this.orderService.exist(this.id);

  }

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getProduct() {
    this.getData(this.productService.getProduct(this.id));
  }

  addToCart() {
    this.isSubmitting = true;
    const exist = this.orderService.exist(this.data._id);
    if (!exist) {
      this.orderService.addOrderToStorage(this.data);
      this.orderExist = true;
    }
    this.isSubmitting = false;
  }
}
