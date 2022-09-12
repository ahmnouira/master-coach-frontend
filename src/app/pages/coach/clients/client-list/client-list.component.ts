import { Component, OnInit } from '@angular/core';
import { COACH_CLIENTS_TABS } from 'src/app/constants/coach/clients';
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

  tabs = COACH_CLIENTS_TABS

  selectedTab: number = 0 

  constructor(private invitationService: InvitationService) {
    super();
  }

  ngOnInit(): void {
    
  }

  handleTabChange(number: number) {
    this.selectedTab = number  
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
