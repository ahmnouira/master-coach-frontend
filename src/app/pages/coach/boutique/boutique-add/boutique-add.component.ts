import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-boutique-add',
  templateUrl: './boutique-add.component.html',
  styleUrls: ['./boutique-add.component.scss'],
  animations: Animations,
})
export class BoutiqueAddComponent implements OnInit {
  form: IProduct = {
    description: '',
    price: '',
    title: '',
    type: null,
    isFree: true,
    category: '',
    displayedInShop: false,
    image: '',
    files: [],
    duration: '',
  };

  isDocument: boolean = true;
  isVideo: boolean = false;
  isPodcast: boolean = false;

  error: string = '';
  isLoading = false;
  categories: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.categories = [...Array(10).keys()].map((el) => `category${el + 1}`);
  }

  async submit() {
    const { description, title, price, type } = this.form;

    if (this.isVideo) this.form.type = ProductType.VIDEO;
    if (this.isDocument) this.form.type = ProductType.DOCUMENT;
    if (this.isPodcast) this.form.type = ProductType.PODCAST;

    console.log('form', this.form);

    // if (!description || !title) return;

    this.isLoading = true;

    this.productService.addProduct(this.form).subscribe(
      (res) => {
        console.log('res:', res);
        if (!res.success) {
          this.onError(res.error);
          return;
        }

        this.error = '';
        this.isLoading = false;
      },
      (err) => this.onError(err)
    );
  }

  onError(error: any) {
    console.log(error);
    this.isLoading = false;
    this.error = error;
  }

  importImage(data: any) {
    console.log('data', data);
    this.form.image = data;
  }

  addFiles(event: any) {
    console.log('AddFiles', event);
  }
}
