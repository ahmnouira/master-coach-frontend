import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUri = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getNotifications(userId) {
    return this.httpClient
      .get<any>(this.baseUri + '/notifications/' + userId)
      .pipe(catchError(this.handleError));
  }

  markOneAsRead(notfiId) {
    return this.httpClient
      .put<any>(this.baseUri + '/mark_as_read/' + notfiId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  markAllAsRead(userId) {
    return this.httpClient
      .put<any>(this.baseUri + '/mark_all_as_read/' + userId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
