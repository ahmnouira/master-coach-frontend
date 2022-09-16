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
    headers: new HttpHeaders({}),
  };

  constructor(protected httpClient: HttpClient) {}

  protected getFile<R = any>(url: string): Observable<R> {
    return this.httpClient
      .get<R>(this.baseUri + url, {
        reportProgress: true,
        responseType: 'blob' as 'json',
      })
      .pipe(catchError(this.handleError));
  }

  protected getFileFormUrl<R = any>(url: string): Observable<R> {
    return this.httpClient
      .get<R>(url, {
        responseType: 'blob' as 'json',
      })
      .pipe(catchError(this.handleError));
  }

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

  protected post<T = any, R = any>(url: string, data: T): Observable<R> {
    return this.httpClient
      .post<R>(this.baseUri + url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  protected put<T = any, R = any>(url: string, data?: T): Observable<R> {
    return this.httpClient
      .put<R>(this.baseUri + url, data, this.httpOptions)
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
      errorMessage = error.error.error;
    }
    //window.alert(errorMessage);
    /* TODO: change deprecated */
    return throwError(errorMessage);
  }
}
