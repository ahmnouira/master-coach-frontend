import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../services/base-service/base.service';
import { IConfirmEmail } from './interfaces/confirm-email';
import { IForgotPassword } from './interfaces/forgot-password';
import { IResendVerification } from './interfaces/resend-verification';
import { IResetPassword } from './interfaces/reset-password';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {

  private  resendEmail =  ''

  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/login',
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

  resetPassword(resetPasswordData: IResetPassword): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/reset_password',
        JSON.stringify(resetPasswordData),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  forgotPassword(forgotPasswordData: IForgotPassword): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/forgot_password',
        JSON.stringify(forgotPasswordData),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  confirmEmail(confirmPasswordData: IConfirmEmail): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUri + '/verify_email',
        JSON.stringify(confirmPasswordData),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  resendVerification(resendVerificationData: IResendVerification) {
    return this.httpClient
      .post<any>(
        this.baseUri + '/resend_verification',
        JSON.stringify(resendVerificationData),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }


  set setResendEmail (email: string) {
    this.resendEmail = email
  }

  get getResendEmail () {
    return this.resendEmail
  }
}
