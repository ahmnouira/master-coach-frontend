import { Component, OnInit } from '@angular/core';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IClient } from 'src/app/interfaces/client.interface';
import { CoachService } from 'src/app/services/coach-service/coach.service';
import { InvitationService } from 'src/app/services/invitation-service/invitation.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  animations: Animations,
})
export class ClientFormComponent extends FormHelper implements OnInit {
  form: Partial<IClient> = {
    email: '',
  };

  teamsList: any = [];
  selectedTeam: any = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private coachService: CoachService,
    private invitationService: InvitationService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTeamsList();
    this.isLoading = false;
  }

  submit() {
    this.isSubmitting = true;
    const { email } = this.form;

    if (!email) {
      this.onError();
      return;
    }
    this.invitationService.addInvitation({ email }).subscribe(
      (res) => {
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        console.log('res', res.data);
        this.onSuccess();
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  getTeamsList() {
    this.coachService
      .GetTeams(this.tokenStorageService.getUser()._id)
      .subscribe(
        (data) => {
          console.log(data);
          this.teamsList = data.teams;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
