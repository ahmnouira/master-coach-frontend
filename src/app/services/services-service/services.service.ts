import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IService } from 'src/app/interfaces/service.interface';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends BaseService {
  addService(data: IService): Observable<any> {
    return this.post('/services', data);
  }

  getServices(): Observable<any> {
    return this.get('/services');
  }

  getService(id: string): Observable<any> {
    return this.get(`/services/${id}`);
  }
}
