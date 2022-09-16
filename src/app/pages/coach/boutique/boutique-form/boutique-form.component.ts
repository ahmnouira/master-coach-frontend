import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { ProductService } from 'src/app/services/product-service/product.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-boutique-form',
  templateUrl: './boutique-form.component.html',
  styleUrls: ['./boutique-form.component.scss'],
  animations: Animations,
})
export class BoutiqueFormComponent extends FormHelper implements OnInit {
  @Input() id: string = ''; // if id means edit

  form: Partial<IProduct> = {
    description: '',
    price: '',
    title: '',
    type: ProductType.DOCUMENT,
    isFree: true,
    category: '',
    displayedInShop: false,
    image: '',
    file: '',
    duration: '',
  };

  selectedCategories: any = [];
  categories: any[] = [];

  found: boolean;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCategories();
    if (this.id) {
      // means edit
      this.productService.getProduct(this.id).subscribe(
        (res) => {
          if (!res.success) {
            this.found = false;
            this.onError(res.error);
            return;
          }
          const product = res.data as IProduct;

          this.form = {
            description: this.getString(product.description),
            title: this.getString(product.title),
            type: product.type,
            category: this.getString(product.category),
            isFree: product.isFree,
            duration: this.getString(product.duration),
            image: this.getFileUrl(product.image),
            file: this.getFileUrl(product.file),
            price: this.getString(product.price),
            displayedInShop: product.displayedInShop,
          };

          const category = this.categories?.find(
            (el) => el.name === this.form.category
          );
          if (category) {
            this.selectedCategories = [category];
          }
  
          this.found = true;
          this.isLoading = false;
        },
        (err) => {
          this.found = false;
          this.onError(err);
        }
      );
    } else {
      this.found = true;
      this.isLoading = false;
    }
  }

  getCategories() {
    this.authService.currentUser$.subscribe((user) => {
      this.categories = this.getArray(user.category);
    });
  }
  getMultiFileFieldData() {
    switch (this.form.type) {
      case ProductType.DOCUMENT:
        return {
          title: 'Ajouter un document',
          type: 'pdf',
        };
      case ProductType.VIDEO: {
        return {
          title: 'Ajouter une vidéo',
          type: 'video',
        };
      }

      case ProductType.PODCAST: {
        return {
          title: 'Ajouter un podcast',
          type: 'audio',
        };
      }
      // by default is document
      default:
        return {
          title: 'Ajouter un document',
          type: 'pdf',
        };
    }
  }

  handleFree(checked) {
    if (checked) {
      this.form.price = '';
    }
  }

  pricePattern() {
    if (!this.form.price) {
      return false;
    }

    return !(parseInt(this.form.price) >= 30);
  }

  durationPattern() {
    if (!this.form.duration) {
      return false;
    }
    return !(parseInt(this.form.duration) >= 30);
  }

  async submit() {
    this.isSubmitting = true;
    this.error = ''; // remove the error when re-submitting

    const { description, title, price, isFree, duration } = this.form;

    if (!title || !description || !duration) {
      this.onError('');
      return;
    }

    // check if not a free
    if (!isFree && !parseInt(price)) {
      // this.onError('Please check price');
      this.onError('')
      return;
    }

    const formData = this.getFormData(this.form);

    formData.set('price', parseInt(price).toString());

    let method: Observable<any>;

    if (this.id) {
      method = this.productService.editProduct(this.id, formData);
    } else {
      method = this.productService.addProduct(formData);
    }

    method.subscribe(
      (res) => {
        if (!res.success && res.error) {
          this.onError(res.error);
          return;
        }
        this.onSuccess(() => {
          this.routeService.navigate(['/pages/coach/boutique']);
        });
      },
      (err) => this.onError(err)
    );
  }

  importFile(data: any, key: string) {
    this.form[key] = data;
  }
}
