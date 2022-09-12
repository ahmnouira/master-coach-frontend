import { Component, OnInit } from '@angular/core';
import { FormSimpleHelper } from 'src/app/helpers/FormSimpleHelper';
import { InvitationService } from 'src/app/services/invitation-service/invitation.service';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.scss'],
})
export class InvitationFormComponent
  extends FormSimpleHelper
  implements OnInit
{
  override form = {
    email: null,
    password: null,
    confirmPassword: null,
    username: null,
  };

  token = '';
  constructor(
    private invitationService: InvitationService,
    private routeService: RouteService
  ) {
    super();
    this.routeService.setTitle('MasterCoach - Invitation');
  }

  ngOnInit() {
    this.token = this.routeService.getQueryParamToken;
  }


  submit() {

    const {confirmPassword, password, email, username} = this.form


    this.submitData(this.invitationService.acceptInvitation({ password: this.form.username, token: this.token, username }), {
      password,
      confirmPassword, 
      username,
    })
}
}
