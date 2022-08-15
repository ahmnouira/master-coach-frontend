import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Animations } from '../../shared/animations';
import { UserService } from '../../services/user-service.service';
import { retry } from 'rxjs';
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
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
  ) {
    this.routeService.setTitle('MasterCoach - Récupération de mot de passe');
  }

  ngOnInit() {
  
  }

  async restPassword() {
    const { password, confirmPassword } = this.form;

    if (!password || !confirmPassword) return;


    this.isLoading = true

    this.authService.resetPassword({ password, token: this.routeService.getToken }).subscribe(
      (res) => {
        this.routeService.navigate(['/core/login']);
      },
      (error) => {
        this.errorMessage = error;
        console.error(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }
}
