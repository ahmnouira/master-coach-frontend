import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  getAllUser() {
    return this.httpClient.get(this.baseUri + '/all_users');
  }

  getSingleUser(id): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUri + '/get_user/' + id)
      .pipe(catchError(this.handleError));
  }

  getSingleUserByEmail(email): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.httpClient
      .get<any>(this.baseUri + '/getUserByEmail', { params })
      .pipe(catchError(this.handleError));
  }

  saveUser(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/create_user',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateUser(user: any, id: any): Observable<any> {
    return this.httpClient
      .put<any>(
        this.baseUri + '/update_user/' + id,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteUser(id) {
    return this.httpClient
      .delete<any>(this.baseUri + '/delete_user/' + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
