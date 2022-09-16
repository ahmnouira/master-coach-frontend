import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';


interface IAddInvitation  {
  email: string
}

interface IAcceptInvitation  {
  token: string
  password: string
  username: string
}


@Injectable({
  providedIn: 'root'
})
export class InvitationService extends BaseService {

  addInvitation(data: IAddInvitation): Observable<any> {
    return this.post('/invitations', data);
  }

  acceptInvitation(data: IAcceptInvitation): Observable<any> {
    return this.post('/invitations/accept', data);
  }

  getCoachInvitations(): Observable<any> {
    return this.get('/invitations/mine');
  }
}
