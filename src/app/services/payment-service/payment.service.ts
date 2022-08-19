import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/models/plan.model';
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
  private selectedPlan: Plan;

  savePlan(data: ISubscribe): Observable<any> {
    return this.post('payment', data);
  }

  set setSelectedPlan(plan: Plan) {
    this.selectedPlan = plan;
  }

  get getSelectedPlan() {
    return this.selectedPlan;
  }
}
