import { Component, OnInit } from '@angular/core';
import { UserHelper } from 'src/app/helpers/UserHelper';
import { CoachService } from 'src/app/services/coach-service/coach.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TwilioService } from 'src/app/services/twilio-service/twilio.service';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
})
export class ClientCardComponent extends UserHelper implements OnInit {
  selectedUser: any;

  modeEdit = false;

  coachTeams = [];
  coachUsers: any = [];

  selectedTeam: any;

  selectedUserToupdate: any = {};

  constructor(
    private coachService: CoachService,
    private routeService: RouteService,
    private twilioService: TwilioService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getClient();
    this.init(this.selectedUser);
  }

  getClient() {
    // this.setSelectedClient();
    this.coachService.selectedClient.subscribe((client) => {
      this.selectedUser = client;
    });
  }

  private setSelectedClient() {
    /*
     const client = this.coachService.getOrdersFromStorage();
    if (Array.isArray(orders) && orders.length) {
      this.orderService.setOrders = orders;
    }
    */
  }

  deleteUser(userElement) {}

  getUserTeam(requestedUser) {
    return this.coachTeams.filter((elem) => {
      let user = elem.users.filter((user) => user._id == requestedUser._id)[0];
      if (user) return elem;
    })[0];
  }

  async saveUser() {
    let userTeam = this.getUserTeam(this.selectedUser);
    if (userTeam && userTeam?._id != this.selectedTeam) {
      // Check user is in team and user's team is different than
      // await this.deleteUserFromTeam(this.selectedUser, userTeam);
      // await this.addUserToTeam(this.selectedUserToupdate, this.selectedTeam);
    } else if (!userTeam && this.selectedTeam) {
      //  await this.addUserToTeam(this.selectedUserToupdate, this.selectedTeam);
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

  /*
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
  */

  createNewConversation(user: any) {
    this.twilioService.createNewConversation(user._id).subscribe(
      (data) => {
        console.log(data);
        this.routeService.navigate(['/pages/conversations']);
      },
      (error) => {}
    );
    console.log(user._id);
  }
}
