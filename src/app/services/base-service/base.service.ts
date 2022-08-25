import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected baseUri = environment.apiUrl + '/api';

  protected httpOptions = {
    // remove these
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      // 'Cross-Origin-Resource-Policy': 'cross-origins'

      //  'Access-Control-Allow-Headers':
      //  'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    }),
  };

  constructor(protected httpClient: HttpClient) {}

  protected get<R = any>(url: string, params?: HttpParams): Observable<R> {
    return this.httpClient
      .get<R>(this.baseUri + url, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  protected delete<R = any>(url: string): Observable<R> {
    return this.httpClient
      .delete<R>(this.baseUri + url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  protected post<T = any, R = any>(
    url: string,
    data: T,
    options?: { formData: boolean }
  ): Observable<R> {
    return this.httpClient
      .post<R>(this.baseUri + url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  protected put<T = any, R = any>(url: string, data?: T): Observable<R> {
    return this.httpClient
      .put<R>(this.baseUri + url, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /* TODO: fix  deprecated */
  private handleError(error: any) {
    let errorMessage = '';
    // Get client-side error
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      // console.log("error.error", error)
      errorMessage = error.error.error;
    }
    //window.alert(errorMessage);
    /* TODO: change deprecated */
    return throwError(errorMessage);
  }
}
