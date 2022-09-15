import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Product } from 'src/app/models/product/product.model';
import { Service } from 'src/app/models/service/service.model';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ServicesService } from 'src/app/services/services-service/services.service';

@Component({
  selector: 'app-boutique-view',
  templateUrl: './boutique-view.component.html',
  styleUrls: ['./boutique-view.component.scss'],
})
export class BoutiqueViewComponent
  extends PageHelper<Product>
  implements OnInit
{
  id: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getId();

    this.getProduct();
  }

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getProduct() {
    this.getData(this.productService.getProduct(this.id), {
      debug: true,
    });
  }
}
