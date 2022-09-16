import { Component, OnInit } from '@angular/core';
import { FormSimpleHelper } from 'src/app/helpers/FormSimpleHelper';
import { InvitationService } from 'src/app/services/invitation-service/invitation.service';
import { RouteService } from 'src/app/services/route-service/route.service';

type Form = {
  username: string;
  password: string;
  confirmPassword: string;
};
@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.scss'],
})
export class InvitationFormComponent
  extends FormSimpleHelper
  implements OnInit
{
  form: Form = {
    password: '',
    confirmPassword: '',
    username: '',
  };

  token = '';
  constructor(
    private invitationService: InvitationService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit() {
    this.routeService.setTitle('MasterCoach - Invitation');
    this.token = this.routeService.getQueryParamToken;
  }

  submit() {
    const { confirmPassword, password, username } = this.form;

    if (password !== confirmPassword) {
      this.onError();
      return;
    }

    this.submitData(
      this.invitationService.acceptInvitation({
        password: this.form.username,
        token: this.token,
        username,
      }),
      {
        password,
        confirmPassword,
        username,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            this.routeService.replace('/login');
          }, 2000);
        },
      }
    );
  }
}
