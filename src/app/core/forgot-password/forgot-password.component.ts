import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service.service';
import { Animations } from 'src/app/shared/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: Animations,
})
export class ForgotPasswordComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    public router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private titleService: Title,
    private userService: UserService
  ) {
    this.titleService.setTitle('MasterCoach - Oublier mot de passe');
  }

  ngOnInit(): void {}

  async forgotPassword() {
    const { email } = this.form;
    this.authService.forgotPassword({ email }).subscribe(
      (res) => {
        console.log('res', res.success, res.data);
        if (res.success && res.data) this.successMessage = res.data;
      },
      (error) => {
        this.errorMessage = error;
        console.error(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }
}
