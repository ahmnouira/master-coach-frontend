import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { IUser } from 'src/app/interfaces/user-interface';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss'],
})
export class LibraryViewComponent extends PageHelper<Product> implements OnInit {

  id: string = ''

  coach: Partial<IUser> = {}


  isSubmitting: boolean

  isIndiv: boolean
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService ) {
      super()

  }

  ngOnInit(): void {
    this.getId()
    this.getProducts()
  }

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }


  getProducts() {

   console.log('id', this.id)

    this.getData(
      this.productService.getProduct(this.id),
      {
        debug: true,
      }
    );
}

    addToCart() {

    }

}
