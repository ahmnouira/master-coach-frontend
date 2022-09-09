import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, retry } from 'rxjs';
import { Order } from 'src/app/models/order/order.model';
import { BaseService } from '../base-service/base.service';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  orders$ = this.orders.asObservable();

  constructor(
    protected override httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    super(httpClient);
  }

  addOrderToStorage(order: any) {
    const previousOrders = this.getOrdersFromStorage();
    if (previousOrders && previousOrders.length) {
      this.setOrders = [...previousOrders, order]; // for state management
      this.addOrdersToStorage([...previousOrders, order]);
    } else {
      this.setOrders = [order];
      this.addOrdersToStorage([order]);
    }
  }

  addOrdersToStorage(orders: Order[]) {
    this.localStorageService.setItem('orders', orders);
  }

  getOrdersFromStorage() {
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

  exist(id: string): boolean {
    const orders = this.getOrdersFromStorage();
    if (orders && orders.length) {
      const found = orders.find((el) => el._id === id);
      if (found) {
        return true;
      }
    }
    return false;
  }
}
