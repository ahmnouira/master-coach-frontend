import { Component, Input, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { InvitationService } from 'src/app/services/invitation-service/invitation.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent extends PageHelper implements OnInit {
  filterString = '';

  coachUsers: any = [];

  coachObject: any = {};

  constructor(private invitationService: InvitationService) {
    super();
  }

  ngOnInit(): void {
    this.getInvitations();
  }

  getInvitations() {
    this.getData(this.invitationService.getCoachInvitations(), {
      debug: true,
    });
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
}
