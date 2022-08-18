import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IService } from 'src/app/interfaces/service.interface';
import { BaseService } from '../base-service/base.service';


@Injectable({
  providedIn: 'root'
})
export class ServicesService extends BaseService {
  
  addProduct(data: IService) : Observable<any> {
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
