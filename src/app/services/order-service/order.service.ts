import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/app/models/order/order.model';
import { BaseService } from '../base-service/base.service';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  private orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  orders$ = this.orders.asObservable();

  constructor(
    protected override httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    super(httpClient);
  }

  addOrdersToStorage(orders: any[]) {
    this.localStorageService.setItem('orders', orders);
  }

  getOrdersFromStorage(orders: any[]) {
    return this.localStorageService.getItem<Order[]>('orders');
  }

  addOrder(data: any): Observable<any> {
    return this.post('/orders', data);
  }

  getOrders(): Observable<any> {
    return this.get('/orders');
  }

  set setOrders(orders: Order[]) {
    this.orders.next(orders);
  }
}
