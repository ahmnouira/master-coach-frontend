import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { AuthService } from 'src/app/core/auth.service';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { ProductService } from 'src/app/services/product-service/product.service';
import { RouteService } from 'src/app/services/route-service/route.service';
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
export class BoutiqueAddComponent extends FormHelper implements OnInit {
  form: IProduct = {
    description: '',
    price: '',
    title: '',
    type: ProductType.DOCUMENT,
    isFree: true,
    category: [],
    displayedInShop: false,
    image: '',
    files: [],
    duration: '',
  };

  typeImportFiles = {
    type: 'pdf',
    title: 'Ajouter des documents',
  };

  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.categories = this.getArray(user.category);
    });
  }

  getMultiFileFieldData() {
    switch (this.form.type) {
      case ProductType.DOCUMENT:
        return {
          title: 'Ajouter des documents',
          type: 'pdf',
        };
      case ProductType.VIDEO: {
        return {
          title: 'Ajouter des vidéos',
          type: 'video',
        };
      }

      case ProductType.PODCAST: {
        return {
          title: 'Ajouter des podcasts',
          type: 'audio',
        };
      }
      // by default is document
      default:
        return {
          title: 'Ajouter des documents',
          type: 'pdf',
        };
    }
  }


  handleFree(checked) {
    if(checked) {
      this.form.price = ''
    }
  }

  durationPattern() {
    if(!this.form.duration) {
      return false
    }
    return !(parseInt(this.form.duration) >= 30)
  }

  async submit() {
    this.isSubmitting = true;
    const { description, title, price, type, category, isFree, duration } = this.form;

    if (!title || !description || !description) {
      this.onError('');
      return;
    }

    console.log("price", price, duration)

    // check if not a free 
    if(!isFree && !price) {
      this.onError('')
      return
    }



    const formData = this.getFormData(this.form);
    
    this.productService.addProduct(formData).subscribe(
      (res) => {
        console.log('res:', res);
        if (!res.success) {
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

  importImage(data: any) {
    this.form.image = data;
  }

  addFiles(data: any) {
    this.form.files = data;
  }
}
