import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IService } from 'src/app/interfaces/service.interface';
import { Service } from 'src/app/models/service/service.model';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends BaseService {
  private services: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>(
    []
  );
  services$ = this.services.asObservable();

  addService(data: any): Observable<any> {
    return this.post('/services', data, {
      formData: true,
    });
  }

  getServices(): Observable<any> {
    return this.get('/services');
  }

  getService(id: string): Observable<any> {
    return this.get(`/services/${id}`);
  }

  set setServices(services: Service[]) {
    this.services.next(services);
  }
}
