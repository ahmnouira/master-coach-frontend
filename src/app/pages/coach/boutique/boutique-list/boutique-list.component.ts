import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-boutique-list',
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss'],
  animations: Animations,
})
export class BoutiqueListComponent
  extends PageHelper<Product[]>
  implements OnInit
{
  search = '';
  filteredData: Product[];

  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.getProducts();
    this.filteredData = this.data;
  }

  getProducts() {
    this.getData(
      this.productService.getProducts({
        all: false,
        displayedInShop: false,
      }),
      {
        debug: true,
      }
    );
  }

  hideProduct(id: string) {
    const filteredData = this.data.filter((el) => el._id !== id);
    this.data = [...filteredData];
    this.productService.hideProduct(id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  trackById(_index: number, product: Product) {
    return product._id;
  }

  resetFilters() {
    this.filteredData = this.data;
    // this.selectedComp = 'Compétences';
    // this.selectedAccr = 'Accréditations';
    // this.selectedCoachType = 'Type de coach';
    // this.selectedContent = 'Type de contenus';
    // this.filterString = '';
    this.search = '';
  }

  handleSearch(search: string) {
    console.log('thisSearch', this.search, search);
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
