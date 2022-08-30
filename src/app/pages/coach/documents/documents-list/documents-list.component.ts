import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss'],
})
export class DocumentsListComponent implements OnInit {
  filterString = '';

  isLoading = true;
  error: string = '';
  products: Product[];
  found: boolean;
  data: any = [];

  quizList: any = [];

  loadingAnimation: boolean = false;
  selectedStatus = 'status';
  selectedType = 'type';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getProducts({
        all: false,
        displayedInShop: false,
      })
      .pipe()
      .subscribe(
        (res) => {
          if (!res.success) {
            this.isLoading = false;
            this.error = res.error;
            return;
          }
          console.log('data', res.data);
          this.products = res.data;
          this.found = Boolean(res.data.length);
          this.isLoading = false;
        },
        (error) => {
          this.found = false;
          this.isLoading = false;
          this.error = error;
        }
      );
  }

  filterInputChanged(event) {}

  public onOptionsSelected(event, selectname: string) {
    const value = event.target.value;
    console.log(value);
    if (this.quizList.length == 0) this.quizList = this.data;
    if (selectname == 'type') {
      this.quizList = this.data.filter((elem) =>
        elem?.type.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (selectname == 'status') {
      this.quizList = this.data.filter((elem) =>
        elem?.status.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
}
