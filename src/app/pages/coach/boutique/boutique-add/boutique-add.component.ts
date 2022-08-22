import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-boutique-add',
  templateUrl: './boutique-add.component.html',
  styleUrls: ['./boutique-add.component.scss'],
  animations: Animations
})
export class BoutiqueAddComponent implements OnInit {
  form: IProduct = {
    description: '', 
    price: '', 
    title: '', 
    type: null, 
    isFree: true,
    category: '', 
    
  };


  isVideo: boolean = false
  isDocument: boolean = false

  error: string  =''
  isLoading = false
  categories = [];

  settings = {};
  constructor(private productService : ProductService) {}

  ngOnInit(): void {

    // select options
    this.settings = {
      text: 'Coaching de carriére...',
      position: 'bottom',
      autoPosition: false,
      searchPlaceholderText: 'Rechercher...',
      filterSelectAllText: 'Sélectionner tous les résultats filtrés',
      filterUnSelectAllText: 'Désélectionner tous les résultats filtrés',
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Désélectionner tout',
      noDataLabel: 'Aucune donnée disponible',
      enableSearchFilter: true,
      labelKey: 'name',
      primaryKey: '_id',
      classes: 'form-control element-spec multiselect',
    };
  }



  async submit() {
    const { description, title, price, type } = this.form;

    if(this.isVideo) this.form.type = ProductType.VIDEO
    if(this.isDocument) this.form.type = ProductType.DOCUMENT

    // if (!description || !title) return;

    this.isLoading = true;


    this.productService.addProduct(this.form).subscribe((res) => {
      console.log('res:', res);
      if(!res.success) {
        this.onError(res.error)
        return
      }

      this.error = ''
      this.isLoading = false
    
    }, (err) => this.onError(err));
  
  }

  onError(error: any) {
    console.log(error)
    this.isLoading = false
    this.error = error
  }

  

  addPhoto(event: any) {}

  save() {}
}
