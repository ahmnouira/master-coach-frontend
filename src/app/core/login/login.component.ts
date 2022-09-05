import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { Animations } from 'src/app/shared/animations';
import { UserRole } from 'src/app/models/role.enum';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: Animations,
})
export class LoginComponent implements OnInit {
  form = {
    email: null,
    password: null,
  };
  isLoading = false;
  isLoginFailed = false;
  errorMessage = '';
  isVerified = true;
  successMessage = '';

  f: NgForm;

  @ViewChild('main') elem: ElementRef;
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private tokenStorage: TokenStorageService
  ) {
    this.routeService.setTitle('MasterCoach - Login');
  }
  ngOnInit(): void {
    this.routeService;
  }

  onSubmit(event: NgForm) {
    this.f = event;
  }

  handleChange(e: any) {
    console.log('change', e);
  }

  async login() {
    const { email, password } = this.form;

    if (!email || !password) return;

    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      (authData) => {
        // console.log('authData:', authData);
        this.tokenStorage.saveToken(authData.token);
        this.tokenStorage.saveTwilioToken(authData.twilio_token);
        setTimeout(() => {
          this.authService.loggedInUser().subscribe(
            (userRes) => {
              if (!userRes.success) {
                this.onError(userRes.error);
                return;
              }

              const user  = userRes.data 
              this.tokenStorage.saveUser(user);
              this.authService.currentUser$.next(user);

              this.onSuccess();

              if (authData.role.toLowerCase() === 'admin') {
                this.routeService.navigateByUrl('/pages/admin/users/list');
              } else {
                this.routeService.navigateByUrl(
                  '/pages/' + authData.role.toLowerCase() + '/settings'
                );
              }
            },
            (err) => {
              console.error('loggedInUserError', err);
            }
          );
        }, 500);
      },
      (err) => this.onError(err)
    );
  }

  onSuccess() {
    this.isLoginFailed = false;
    this.isVerified = true;
    this.isLoading = false;
  }

  onError(err: string) {
    console.log('error', err);
    if (err == 'Your email is not verified') {
      this.isVerified = false;
    }
    this.errorMessage = err;
    this.isLoginFailed = true;
    this.isLoading = false;
  }

  createUser(role: string) {
    this.authService.setUserRole = role as UserRole;
    this.routeService.navigateByUrl(`/create-user/${role.toLowerCase()}`);
  }

  verifyEmail(): void {
    const { email } = this.form;
    if (!email) return;
    this.authService.setResendEmail = email;
    this.routeService.navigate(['verify-email']);
  }
}
