import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

interface ISubscribe {
  stripeToken: string;
  planPrice: string;
  planDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService {
  subscribe(data: ISubscribe): Observable<any> {
    return this.post('payment', data);
  }
}
