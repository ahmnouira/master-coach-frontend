import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { CoachService } from 'src/app/services/coach-service/coach.service';
import { IClient } from 'src/app/interfaces/client.interface';
import { FormHelper } from 'src/app/helpers/FormHelper';

@Component({
  selector: 'app-cc-add',
  templateUrl: './cc-add.component.html',
  styleUrls: ['./cc-add.component.scss'],
})
export class CcAddComponent extends FormHelper implements OnInit {
  form: IClient = {
    email: '',
    equip: '',
    nom: '',
    notes: '',
    prenom: '',
    tel: '',
  };

  teamsList: any = [];
  selectedTeam: any = 'NO_TEAM';

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private coachService: CoachService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTeamsList();
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
