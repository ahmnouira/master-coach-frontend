import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/models/plan.model';
import { BaseService } from '../base-service/base.service';
import { SessionStorageService } from '../session-storage-service/session-storage.service';

type GetPaymentsOptions = {
  all: boolean;
};

interface ISubscribe {
  stripeToken: string;
  planPrice: number;
  planDescription: string;
  planPeriod: string 
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService {
  selectedPlan: Plan;

  constructor(
    protected override httpClient: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    super(httpClient);
  }

  savePlan(data: ISubscribe): Observable<any> {
    return this.post('/payment', data);
  }

  saveSelectedPlan(plan: Plan) {
    this.sessionStorageService.setItem('plan', plan);
  }

  getSavedSelectedPlan() {
    return this.sessionStorageService.getItem<Plan>('plan');
  }

  clearSelectedPlan() {
    return this.sessionStorageService.clearItem('plan');
  }

  getPayments(): Observable<any> {
    return this.get('/payments');
  }

  getPayment(id: string): Observable<any> {
    return this.get(`/payments/${id}`);
  }

  generatePDF(id: string): Observable<any> {
    return this.getFile(`/payments/${id}/generate/pdf
   `);
  }

  set setSelectedPlan(plan: Plan) {
    this.selectedPlan = plan;
  }

  get getSelectedPlan() {
    return this.selectedPlan;
  }
}
