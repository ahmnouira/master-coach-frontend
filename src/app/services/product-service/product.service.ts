import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormationType } from 'src/app/models/formation/formation-type.enum';
import { BaseService } from '../base-service/base.service';

interface AddProduct {
  title: string 
  description: string 
  duration: number
  type: FormationType
  price: number
  category: string 
  isFree?: boolean
  displayedInShop?: boolean
  image: any
  files: any[]
}

@Injectable({
  providedIn: 'root'
})


export class ProductService extends BaseService {

    addProduct(data: AddProduct) : Observable<any> {
      return this.post("/products", data)
    }

    getProducts(displayedInShop = true): Observable<any> {
      const params = new HttpParams().set('displayedInShop', displayedInShop);
      return this.get('/products', params )
    }

    getProduct(id: string) : Observable<any> {
      return this.get(`/products/${id}`)
    }
}
