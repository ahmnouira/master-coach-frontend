import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../services/token-storage.service';
import { UserService } from '../../../../services/user-service.service';
import { CoachService } from '../../../../services/coach.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cc-add',
  templateUrl: './cc-add.component.html',
  styleUrls: ['./cc-add.component.scss'],
})
export class CcAddComponent implements OnInit {
  form: any = {
    password: 'password',
    role: 'Client',
    status: 'En attente',
    competance: [],
    photo: 'assets/img/common/utilisateur.png',
  };
  teamsList: any = [];
  selectedTeam: any = 'NO_TEAM';
  coachObject: any = {};
  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private coachService: CoachService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.getUserFromDb(user._id);
    this.getTeamsList();
  }

  importFile(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(reader.result);
        this.form.photo = reader.result as string;
      };
    }
  }

  saveUser() {
    this.form['username'] =
      this.form['nom'].toLowerCase() + '.' + this.form['prenom'].toLowerCase();
    this.form.photo = this.form.photo
      ? this.form.photo
      : '/assets/img/common/utilisateur.png';
    this.userService.saveUser(this.form).subscribe(
      (newUser) => {
        console.log(newUser);
        let a = [];
        a.push(newUser.user);
        if (this.teamsList.length > 0 && this.selectedTeam != 'NO_TEAM') {
          console.log(this.selectedTeam);
          let team = this.teamsList.filter(
            (elem) => elem._id == this.selectedTeam
          )[0];
          team.team_id = team._id;
          team.users.push(newUser.user);
          console.log(team);
          this.coachService.UpdateTeam(team).subscribe(
            (addData) => {},
            (error) => {
              console.log(error);
            }
          );
        }
        this.coachObject.clients = [...this.coachObject.clients, newUser.user];
        this.userService
          .updateUser(this.coachObject, this.coachObject._id)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        this.router.navigate(['/pages/coach/coach-client']);
      },
      (error) => {
        window.alert(error.message);
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

  private getUserFromDb(id: any) {
    this.userService.getSingleUser(id).subscribe(
      (user) => {
        this.coachObject = user;
      },
      (error) => {
        return {};
      }
    );
  }
}
