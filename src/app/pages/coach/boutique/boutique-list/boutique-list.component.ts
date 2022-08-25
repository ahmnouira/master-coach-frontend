import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-boutique-list',
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss'],
})
export class BoutiqueListComponent implements OnInit {
  filterString = '';

  isLoading = true;
  error: string = '';
  formations = [];
  found: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getProducts()
      .pipe()
      .subscribe((res) => {
        if (!res.success) {
          this.isLoading = false;
          this.error = res.error;
          return;
        }
        console.log('data', res.data);
        this.formations = res.data;
        this.found = Boolean(res.data.length);
        this.isLoading = false;
      });
  }

  filterInputChanged(event) {}
}
