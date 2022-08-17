import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  getAllCategorys() {
    return this.get('/getAllCategorys');
  }

  getCoachByCategory(id: any): Observable<any> {
    return this.get('/getByCategory/' + id);
  }

  createCategory(user: any): Observable<any> {
    return this.post('/createCategory', user);
  }

  updateCategory(user: any): Observable<any> {
    return this.post('/updateCategory', user);
  }

  deleteCategory(name: any): Observable<any> {
    return this.post('/deleteCategory', name);
  }

  getAllCompetances() {
    return this.get('/getAllCompetances');
  }

  GetClientByCompetance(id): Observable<any> {
    return this.get('/getByCompetance/' + id);
  }

  createCompetance(user: any): Observable<any> {
    return this.post('/createCompetance', user);
  }

  updateCompetance(user: any): Observable<any> {
    return this.post('/updateCompetance', user);
  }

  deleteCompetance(name: any): Observable<any> {
    return this.post('/deleteCompetance', name);
  }

  getAllAccreditations() {
    return this.get('/getAllAccreditations');
  }

  GetUserByAccreditation(id: any): Observable<any> {
    return this.get('/getByAccreditation/' + id);
  }

  createAccreditation(user: any): Observable<any> {
    return this.post('/createAccreditation', user);
  }

  updateAccreditation(user: any): Observable<any> {
    return this.post('/updateAccreditation', user);
  }

  deleteAccreditation(name: any): Observable<any> {
    return this.post('/deleteAccreditation', name);
  }
}
