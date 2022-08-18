import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';

// import {AccessToken as token} from '@twilio/conversations';
// const AccessToken = token.jwt.AccessToken
// const ChatGrant = AccessToken.ChatGrant;

@Injectable({
  providedIn: 'root',
})
export class TwilioService extends BaseService {
  createAccessToken() {
    return this.get('/user/conversations/token');
  }

  getConversations(sessionData: any) {
    return this.post('/conversations', sessionData);
  }

  getVideoRoomToken(sessionData: any) {
    return this.post('/room/token', sessionData);
  }

  joinRoom(sessionData: any) {
    return this.post('/room/join', sessionData);
  }

  createNewConversation(to: any) {
    return this.post('/conversations/create', to);
  }

  deleteConversation(conversationSid: any) {
    /*this.httpOptions.headers.append('Authorization','Basic ' + btoa('ACa00a1b25450c592727057f4fe145085c:db283cfd555ae4075776b408edea239c'))
      this.httpOptions.headers.append('postman-token', '2498d922-e26e-97a2-4bc2-ca5052b29fe7')
      this.httpOptions.headers.append('cache-control', 'no-cache')*/

    return this.delete('/conversations/' + conversationSid);
  }
}
