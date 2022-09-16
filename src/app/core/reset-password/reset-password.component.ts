import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { FormSimpleHelper } from 'src/app/helpers/FormSimpleHelper';

type Form = {
  password: string;
  confirmPassword: string;
};

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends FormSimpleHelper implements OnInit {
  form: Form = {
    password: '',
    confirmPassword: '',
  };

  token = '';
  constructor(
    private authService: AuthService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit() {
    this.routeService.setTitle('MasterCoach - Récupération de mot de passe');
    this.token = this.routeService.getQueryParamToken;
  }

  submit() {
    
    const { confirmPassword, password } = this.form;

    if (password !== confirmPassword) {
      this.onError('');
      return;
    }

    this.submitData(
      this.authService.resetPassword({
        password,
        token: this.token,
      }),
      {
        password,
        confirmPassword,
      },
      {
        onSuccess: () => {
         
            this.routeService.replace('/login')
        
        }
      }
    );
  }
}
