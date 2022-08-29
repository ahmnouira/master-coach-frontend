import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

type GetProductsOptions = {
  displayedInShop: boolean;
  all: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  addProduct(data: any): Observable<any> {
    return this.post('/products', data);
  }
  getProducts(options: GetProductsOptions): Observable<any> {
    const params = new HttpParams().set(
      'displayedInShop',
      options.displayedInShop
    );
    return this.get(options.all ? '/products' : '/products/mine', params);
  }

  getProduct(id: string): Observable<any> {
    return this.get(`/products/${id}`);
  }
}
