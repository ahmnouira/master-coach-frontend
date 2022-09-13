import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { CoachService } from 'src/app/services/coach-service/coach.service';
import { InvitationService } from 'src/app/services/invitation-service/invitation.service';

@Component({
  selector: 'app-client-all-list',
  templateUrl: './client-all-list.component.html',
  styleUrls: ['./client-all-list.component.scss'],
})
export class ClientAllListComponent extends PageHelper implements OnInit {
  @Input() name: string = 'all';

  title: string;

  constructor(
    private invitationService: InvitationService,
    private coachService: CoachService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getClients();
    this.title = this.name + ' clients';
  }

  getClients() {
    let method: Observable<any>;
    if (this.name === 'invited') {
      method = this.invitationService.getCoachInvitations();
    } else if (this.name === 'all') {
      method = this.coachService.getClients();
    }
    this.getData(method);
  }
}
