import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from 'src/app/models/service/service.model';
import { BaseService } from '../base-service/base.service';

type GetServicesOptions = {
  all: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends BaseService {
  private services: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>(
    []
  );
  services$ = this.services.asObservable();

  addService(data: any): Observable<any> {
    return this.post('/services', data);
  }

  getServices(options: GetServicesOptions): Observable<any> {
    return this.get(options.all ? '/services' : '/services/mine');
  }

  getService(id: string): Observable<any> {
    return this.get(`/services/${id}`);
  }

  hideService(id: string): Observable<any> {
    return this.delete(`/services/${id}`);
  }

  set setServices(services: Service[]) {
    this.services.next(services);
  }
}
