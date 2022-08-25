import { Component, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Animations } from 'src/app/shared/animations';

type Form = IProduct & {
  isDocument: boolean;
  isVideo: boolean;
  isPodcast: boolean;
};

@Component({
  selector: 'app-boutique-add',
  templateUrl: './boutique-add.component.html',
  styleUrls: ['./boutique-add.component.scss'],
  animations: Animations,
})
export class BoutiqueAddComponent implements OnInit {
  form: Form = {
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
    isDocument: true,
    isVideo: false,
    isPodcast: false,
  };

  typeImportFiles = {
    type: 'pdf',
    title: 'Ajouter des documents',
  };

  error: string = '';
  isLoading = false;
  categories: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.categories = [...Array(10).keys()].map((el) => `category${el + 1}`);
  }

  getTitle() {
    if (this.form.isDocument) return 'xxxx';
    if (this.form.isPodcast) return 'ttttttt';
    return '';
  }

  async submit() {
    const { description, title, price, type } = this.form;

    if (this.form.isVideo) this.form.type = ProductType.VIDEO;
    if (this.form.isDocument) this.form.type = ProductType.DOCUMENT;
    if (this.form.isPodcast) this.form.type = ProductType.PODCAST;

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
