import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-boutique-list',
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss'],
  animations: Animations,
})
export class BoutiqueListComponent extends PageHelper<Product[]> implements OnInit {
  filterString = '';

  constructor(private productService: ProductService) {
    super();
  }
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.getData(
      this.productService.getProducts({
        all: false,
        displayedInShop: false,
  }), {
    debug: true
  }
    );
  }

  filterInputChanged(event) {}
}
