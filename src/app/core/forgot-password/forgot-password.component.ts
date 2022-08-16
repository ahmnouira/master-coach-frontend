import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route-service/route.service';
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
  isLoading = false;
  isLoginFailed = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private routeService: RouteService
  ) {
    this.routeService.setTitle('MasterCoach - Oublier mot de passe');
  }

  ngOnInit(): void {}

  async forgotPassword() {
    const { email } = this.form;

    if (!email) return;

    this.isLoading = true;
    this.authService.forgotPassword({ email }).subscribe(
      (res) => {
        console.log('res', res.success, res.data);
        if (res.success && res.data) {
          this.successMessage = res.data;
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error;
        console.error(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }
}
