import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { elementAt } from 'rxjs';
import { TwilioConversationService } from 'src/app/services/twilio.service';
import { Router } from '@angular/router';
import { CoachService } from 'src/app/services/coach.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-cc-list',
  templateUrl: './cc-list.component.html',
  styleUrls: ['./cc-list.component.scss'],
})
export class CcListComponent implements OnInit {
  modalRef: BsModalRef;
  filterString = '';
  coachTeams = [];
  userToDelete: any = [];
  coachUsers: any = [];
  defaultTeam: any = { users: [] };
  selectedUser: any;
  selectedTeam: any;
  selectedUserToupdate: any;
  modeEdit = false;
  selectAll = false;
  coachObject: any = {};

  constructor(
    private coachService: CoachService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private modalService: BsModalService,
    private conversationService: TwilioConversationService,
    public router: Router
  ) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.getUserFromDb(user._id);
    this.getTeams();
  }

  filterInputChanged(event) {
    if (this.filterString == '') {
      this.coachUsers =
        this.coachObject.clients.length > 0
          ? [...this.coachObject.clients]
          : [];
    } else {
      this.coachUsers = this.coachObject.clients.filter(
        (elem) =>
          elem.nom?.toLowerCase().includes(this.filterString.toLowerCase()) ||
          elem.prenom?.toLowerCase().includes(this.filterString.toLowerCase())
      );
    }
  }

  getTeams() {
    this.coachService
      .GetTeams(this.tokenStorageService.getUser()._id)
      .subscribe(
        (data) => {
          console.log(data);
          this.coachTeams = data.teams;
          this.defaultTeam = data.teams.length > 0 ? data.teams[0] : {};
          this.selectedTeam = this.coachTeams[0]?._id;
        },
        (error) => {}
      );
  }

  getUserTeam(requestedUser) {
    return this.coachTeams.filter((elem) => {
      let user = elem.users.filter((user) => user._id == requestedUser._id)[0];
      if (user) return elem;
    })[0];
  }

  deleteUser(userElement) {
    let team = this.getUserTeam(userElement);
    if (team) {
      let data = {
        coach_id: this.tokenStorageService.getUser()._id,
        team_id: team._id,
        user_id: userElement._id,
      };
      this.coachService.DeleteTeamMember(data).subscribe(
        (data) => {},
        (error) => {
          console.log(error);
        }
      );
    }
    for (var i = 0; i < this.coachUsers.length; i++) {
      var obj = this.coachUsers[i];

      if (userElement._id == obj._id) {
        this.coachUsers.splice(i, 1);
        this.coachObject.clients = [...this.coachUsers];
      }
    }
    this.userService
      .updateUser(this.coachObject, this.coachObject._id)
      .subscribe(
        (data) => {},
        (error) => {
          console.log(error);
        }
      );
    this.selectedUser = null;
  }

  selectedUserChanged(user) {
    this.selectedUser = { ...user };
    this.selectedUserToupdate = { ...user };
    this.selectedTeam = this.getUserTeam(user)?._id;
  }

  checkboxChanged(event) {
    this.userToDelete = this.coachUsers.filter((elem) => elem.selected);
  }

  async saveUser() {
    let userTeam = this.getUserTeam(this.selectedUser);
    if (userTeam && userTeam?._id != this.selectedTeam) {
      // Check user is in team and user's team is different than
      await this.deleteUserFromTeam(this.selectedUser, userTeam);
      await this.addUserToTeam(this.selectedUserToupdate, this.selectedTeam);
    } else if (!userTeam && this.selectedTeam) {
      await this.addUserToTeam(this.selectedUserToupdate, this.selectedTeam);
    }
    await this.userService
      .updateUser(this.selectedUserToupdate, this.selectedUserToupdate._id)
      .subscribe(
        (res) => {
          window.location.reload();
        },
        (error) => {
          console.error(error.message);
        }
      );
  }

  private getUserFromDb(id: any) {
    this.userService.getSingleUser(id).subscribe(
      (user) => {
        this.coachObject = user;
        this.coachObject.clients.forEach((elem) => {
          elem.selected = false;
        });
        this.coachUsers = [...this.coachObject.clients];
      },
      (error) => {
        return {};
      }
    );
  }

  deleteUserFromTeam(user, team) {
    let data = {
      coach_id: this.tokenStorageService.getUser()._id,
      team_id: team._id,
      user_id: user._id,
    };
    this.coachService.DeleteTeamMember(data).subscribe(
      (data) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  addUserToTeam(user, teamId) {
    let team = this.coachTeams.filter((elem) => elem._id == teamId)[0];
    team.team_id = team._id;
    team.users.push(user);
    this.coachService.UpdateTeam(team).subscribe(
      (addData) => {
        console.log(addData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  massDelete() {
    this.userToDelete = this.coachUsers.filter((elem) => elem.selected);
    this.userToDelete.forEach((elem) => {
      if (elem.selected) this.deleteUser(elem);
    });
    this.modalRef.hide();
  }

  createNewConversation(user) {
    this.conversationService.createNewConversation(user._id).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/pages/conversations']);
      },
      (error) => {}
    );
    console.log(user._id);
  }

  selectAllUsers(event) {
    this.coachUsers.forEach((elem) => {
      elem.selected = this.selectAll;
    });
    this.userToDelete = this.coachUsers.filter((elem) => elem.selected);
  }
}
