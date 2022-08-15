import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 animations: Animations,

})
export class LoginComponent implements OnInit  {
  form: any = {
    email: null,
    password: null,
  };
  isLoading = false;
  isLoginFailed = false;
  errorMessage = '';
  isVerified = true;

  successMessage = '';

  @ViewChild('main') elem: ElementRef;
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private tokenStorage: TokenStorageService,
  ) {
    this.routeService.setTitle('MasterCoach - Login');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async login() {
    const { email, password } = this.form;

    if (!email || !password) return;

    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      (authData) => {
        this.isLoading = false
        console.log('authData:', authData);


        /*
              if (user.role.toLowerCase() === 'admin') {
                this.router.navigateByUrl('/pages/admin/users/list');
              } else {
                this.router.navigateByUrl(
                  '/pages/' + user.role.toLowerCase() + '/parametre'
                );
              }*/
        this.tokenStorage.saveToken(authData.token);
        this.tokenStorage.saveTwilioToken(authData.twilio_token);
        this.tokenStorage.saveUser(authData);
        this.isLoginFailed = false;
       
        this.isVerified = true;
      },
      (err) => {
        console.log('error', err);
        if (err == 'Your email is not verified') {
          this.isVerified = false;
        }
        this.errorMessage = err;
        this.isLoginFailed = true;
        this.isLoading = false
      }
    );
  }

  verifyEmail() {
    const { email } = this.form;
    if (!email) return;
    try {
      this.authService.resendVerification({ email }).subscribe((res) => {
        this.isVerified = true;
        if (res.success && res.data) {
          this.successMessage = res.data;
          this.isVerified = true;
        }
      });
    } catch (error) {
      console.error('error', error);
      this.successMessage = '';
      this.errorMessage = String(error);
      this.isLoginFailed = true;
    }
  }
}
