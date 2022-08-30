import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Animations } from '../../shared/animations';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: Animations,
})
export class ResetPasswordComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoading = false;
  isLoginFailed = false;
  errorMessage = '';

  token = '';
  constructor(
    private authService: AuthService,
    private routeService: RouteService
  ) {
    this.routeService.setTitle('MasterCoach - Récupération de mot de passe');
  }

  ngOnInit() {
    this.token = this.routeService.getQueryParamToken;
  }

  async restPassword() {
    const { password, confirmPassword } = this.form;

    if (!password || !confirmPassword) return;

    this.isLoading = true;

    this.authService.resetPassword({ password, token: this.token }).subscribe(
      (res) => {
        this.routeService.replace('/login');
      },
      (error) => {
        this.errorMessage = error;
        console.error(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }
}
