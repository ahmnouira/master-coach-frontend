import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class RdvService extends BaseService {

  createSession(sessionData :any) {
    return this.post('/create_session', sessionData)
  }

  getSession(sessionId :any) {
    return this.get('/get_session/' + sessionId)
  }

  getSessions(userId: any) {
    return this.get('/get_sessions/' + userId)
  }

  updateSession(session: any) {
    return this.put('/update_session/' + session._id, session);
  }

  deleteSession(sessionId: any) {
    return this.delete('/delete_session/' + sessionId);
  }

  acceptSessionByCoach() {
    return this.get('/accept_session_by_coach')
  }

}
