import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RdvService {
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

  createSession(sessionData) {
    return this.httpClient
      .post<any>(
        this.baseUri + '/create_session',
        sessionData,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  getSession(sessionId) {
    return this.httpClient
      .get<any>(this.baseUri + '/get_session/' + sessionId)
      .pipe(catchError(this.handleError));
  }
  getSessions(userId) {
    return this.httpClient
      .get<any>(this.baseUri + '/get_sessions/' + userId)
      .pipe(catchError(this.handleError));
  }
  updateSession(session: any) {
    return this.httpClient
      .put<any>(
        this.baseUri + '/update_session/' + session._id,
        JSON.stringify(session),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  deleteSession(sessionId) {
    return this.httpClient
      .delete<any>(this.baseUri + '/delete_session/' + sessionId)
      .pipe(catchError(this.handleError));
  }
  acceptSessionByCoach() {
    return this.httpClient
      .get<any>(this.baseUri + '/accept_session_by_coach')
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
