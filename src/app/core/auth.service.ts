import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
   return this.post("/login", {email, password})
  }
  register(user: any): Observable<any> {
   return this.post("/create_user", user)
  }

  resetPassword(resetPasswordData: IResetPassword): Observable<any> {
   return this.post("/resetPassword", resetPasswordData)
  }

  forgotPassword(forgotPasswordData: IForgotPassword): Observable<any> {
    return this.post("/forgot_password", forgotPasswordData)
  }

  confirmEmail(confirmPasswordData: IConfirmEmail): Observable<any> {
    return this.post("/verify_email", confirmPasswordData)
  }

  resendVerification(resendVerificationData: IResendVerification) {
    return this.post("/resend_verification", resendVerificationData)
  }

  set setResendEmail (email: string) {
    this.resendEmail = email
  }

  get getResendEmail () {
    return this.resendEmail
  }
}
