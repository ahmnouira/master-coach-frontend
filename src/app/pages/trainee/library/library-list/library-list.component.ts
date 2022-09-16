import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss'],
})
export class LibraryListComponent
  extends PageHelper<Product[]>
  implements OnInit
{
  search: '';

  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.getData(
      // show only the not hidden products 
      this.productService.getProducts({ all: true, displayedInShop: true }),
      {
        debug: true,
      }
    );
  }

  handleSearch(search: string) {
    if (search == '') {
      this.isLoading = true;
      this.getProducts();
    } else {
      if (!this.data.length) {
        this.isLoading = true;
        this.getProducts();
      }
      this.data = this.data.filter(
        (elem) => elem.title?.toLowerCase().includes(search.toLowerCase())
        // ||
        //  elem.prenom?.toLowerCase().includes(this.filterString.toLowerCase())
      );
      if (this.data.length < 1) {
        this.found = false;
      }
    }
  }
}
