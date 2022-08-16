import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { Animations } from 'src/app/shared/animations';
import { UserRole } from 'src/app/models/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: Animations,
})
export class LoginComponent implements OnInit {
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
    private tokenStorage: TokenStorageService
  ) {
    this.routeService.setTitle('MasterCoach - Login');
  }
  ngOnInit(): void {}

  async login() {
    const { email, password } = this.form;

    if (!email || !password) return;

    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      (authData) => {
        this.isLoading = false;
        console.log('authData:', authData);
        this.tokenStorage.saveToken(authData.token);
        this.tokenStorage.saveTwilioToken(authData.twilio_token);
        this.tokenStorage.saveUser(authData);
        this.isLoginFailed = false;

        this.isVerified = true;

        console.log('role', authData.role);

        if (authData.role.toLowerCase() === 'admin') {
          this.routeService.navigateByUrl('/pages/admin/users/list');
        } else {
          this.routeService.navigateByUrl(
            '/pages/' + authData.role.toLowerCase() + '/parametre'
          );
        }
      },
      (err) => {
        console.log('error', err);
        if (err == 'Your email is not verified') {
          this.isVerified = false;
        }
        this.errorMessage = err;
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    );
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
