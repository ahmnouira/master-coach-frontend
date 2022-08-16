import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
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

  getAllCategorys() {
    return this.httpClient.get(this.baseUri + '/getAllCategorys');
  }

  getCoachByCategory(id): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUri + '/getByCategory/' + id)
      .pipe(catchError(this.handleError));
  }

  createCategory(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/createCategory',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateCategory(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/updateCategory',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteCategory(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/deleteCategory',
        JSON.stringify({ name: user }),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getAllCompetances() {
    return this.httpClient.get(this.baseUri + '/getAllCompetances');
  }

  GetClientByCompetance(id): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUri + '/getByCompetance/' + id)
      .pipe(catchError(this.handleError));
  }

  createCompetance(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/createCompetance',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateCompetance(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/updateCompetance',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteCompetance(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/deleteCompetance',
        JSON.stringify({ name: user }),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getAllAccreditations() {
    return this.httpClient.get(this.baseUri + '/getAllAccreditations ');
  }

  GetUserByAccreditation(id): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUri + '/getByAccreditation/' + id)
      .pipe(catchError(this.handleError));
  }

  createAccreditation(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/createAccreditation ',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateAccreditation(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/updateAccreditation ',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteAccreditation(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/deleteAccreditation ',
        JSON.stringify({ name: user }),
        this.httpOptions
      )
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
