import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';
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
    isFree: true
  };
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

    console.log('form', this.form)


    if (!description || !title) return;

    this.isLoading = true;



    /*
    this.productService.addProduct(this.form).subscribe((data) => {
      console.log('data:', data);
    
    }, (err) =>  this.onError(err));
    */
  }

  onError(error: any) {
    console.log(error)
    this.isLoading = false
  }

  

  addPhoto(event: any) {}

  save() {}
}
