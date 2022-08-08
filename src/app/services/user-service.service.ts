import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUri = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllUser(){
    return this.httpClient.get(this.baseUri + '/all_users');
  }

  getSingleUser(id): Observable<any> {
    return this.httpClient.get<any>(this.baseUri + '/get_user/' + id)
      .pipe(
        catchError(this.handleError)
      )
  }

  getSingleUserByEmail(email): Observable<any> {
    const params = new HttpParams()
      .set('email', email);
    return this.httpClient.get<any>(this.baseUri + '/getUserByEmail', {params} )
      .pipe(
        catchError(this.handleError)
      )
  }

  saveUser(user: any) : Observable<any> {
    return this.httpClient.post<any>(this.baseUri + '/create_user', JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateUser(user: any, id: any) : Observable<any> {
    return this.httpClient.put<any>(this.baseUri + '/update_user/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteUser(id){
    return this.httpClient.delete<any>(this.baseUri + '/delete_user/' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  resetPassword(resetPasswordData){
    return this.httpClient.post<any>(this.baseUri + '/reset_password', JSON.stringify(resetPasswordData), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    let errorMessage = '';
    console.error(error);
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error ${error.status} - Message: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
