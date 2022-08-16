import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../models/role.enum';
import { BaseService } from '../services/base-service/base.service';
import { IConfirmEmail } from './interfaces/confirm-email';
import { IForgotPassword } from './interfaces/forgot-password';
import { IResendVerification } from './interfaces/resend-verification';
import { IResetPassword } from './interfaces/reset-password';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private resendEmail = '';

  private userRole: UserRole;

  login(email: string, password: string): Observable<any> {
    return this.post('/login', { email, password });
  }
  register(user: any): Observable<any> {
    return this.post('/create_user', user);
  }

  resetPassword(resetPasswordData: IResetPassword): Observable<any> {
    return this.post('/reset_password', resetPasswordData);
  }

  forgotPassword(forgotPasswordData: IForgotPassword): Observable<any> {
    return this.post('/forgot_password', forgotPasswordData);
  }

  confirmEmail(confirmPasswordData: IConfirmEmail): Observable<any> {
    return this.post('/verify_email', confirmPasswordData);
  }

  resendVerification(resendVerificationData: IResendVerification) {
    return this.post('/resend_verification', resendVerificationData);
  }

  set setUserRole(role: UserRole) {
    this.userRole = role;
  }

  get getUserRole() {
    return this.userRole;
  }

  set setResendEmail(email: string) {
    this.resendEmail = email;
  }

  get getResendEmail() {
    return this.resendEmail;
  }
}
