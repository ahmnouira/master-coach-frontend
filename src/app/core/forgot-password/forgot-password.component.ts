import { Component, OnInit } from '@angular/core';
import { FormSimpleHelper } from 'src/app/helpers/FormSimpleHelper';
import { RouteService } from 'src/app/services/route-service/route.service';
import { Animations } from 'src/app/shared/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: Animations,
})
export class ForgotPasswordComponent
  extends FormSimpleHelper
  implements OnInit
{
  form = {
    email: null,
  };

  constructor(
    private authService: AuthService,
    private routeService: RouteService
  ) {
    super();
    this.routeService.setTitle('MasterCoach - Oublier mot de passe');
  }

  ngOnInit(): void {}

  submit() {
    const { email } = this.form;
    this.submitData(
      this.authService.forgotPassword({
        email,
      }),
      {
        email,
      },
      {
        debug: true,
      }
    );
  }
}
