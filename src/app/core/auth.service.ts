import { Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../services/base-service/base.service';
import { ForgotPassword } from './interfaces/forgot-password';

@Injectable({
  providedIn: 'root',
})


export class AuthService extends BaseService {

  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri,
        JSON.stringify({ email: email, password: password }),
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.handleError));
  }


  register(user: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/create_user',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  resetPassword(resetPasswordData: object) : Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/reset_password',
        JSON.stringify(resetPasswordData),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }


  forgotPassword(forgotPassword: ForgotPassword) : Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/forgot_password',
        JSON.stringify(forgotPassword),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
