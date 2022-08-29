import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-boutique-list',
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss'],
  animations: Animations,
})
export class BoutiqueListComponent implements OnInit {
  filterString = '';

  isLoading = true;
  error: string = '';
  products: Product[];
  found: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getProducts({
        all: false, 
        displayedInShop: false
      })
      .pipe()
      .subscribe((res) => {
        if (!res.success) {
          this.isLoading = false;
          this.error = res.error;
          return;
        }
        console.log('data', res.data);
        this.products = res.data;
        this.found = Boolean(res.data.length);
        this.isLoading = false;
      }, (error) => {
          this.found = false
          this.isLoading = false;
          this.error = error;
      });
  }

  filterInputChanged(event) {}
}
