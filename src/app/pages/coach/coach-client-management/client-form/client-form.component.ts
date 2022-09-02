import { Component, OnInit } from '@angular/core';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IClient } from 'src/app/interfaces/client.interface';
import { CoachService } from 'src/app/services/coach-service/coach.service';
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
  form: IClient = {
    email: '',
    equip: '',
    nom: '',
    notes: '',
    prenom: '',
    tel: '',
  };

  teamsList: any = [];
  selectedTeam: any = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private coachService: CoachService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTeamsList();
    this.isLoading = false;
  }

  submit() {
    this.isSubmitting = true;
    const { prenom, nom, notes, tel, email, equip } = this.form;
    // +33122469999
    if (!prenom || !nom || !tel || !email) {
      this.isSubmitting = false;
      return;
    }
    const formData = this.getFormData(this.form);

    /*
    this.coachService.ad(formData).subscribe(
      (res) => {
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        console.log('res', res.data);
        this.authService.currentUser$.next(res.data);
        this.tokenStorageService.saveUser(res.data);
        this.onSuccess();
      },
      (error) => {
        this.onError(error);
      }
    );
    */
    this.isSubmitting = false;
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
