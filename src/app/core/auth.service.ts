import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRole } from '../models/role.enum';
import { User } from '../models/user-model';
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

  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

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

  loggedInUser(): Observable<any> {
    return this.get('/me');
  }

  updateProfile(data: any): Observable<any> {
    return this.get('/update_profile', data);
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
