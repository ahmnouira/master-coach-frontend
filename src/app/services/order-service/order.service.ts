import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  addOrder(data: any): Observable<any> {
    return this.post('/orders', data);
  }
  getOrders(): Observable<any> {
    return this.get('/orders');
  }
}
