import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Client } from '@twilio/conversations';

// import {AccessToken as token} from '@twilio/conversations';

// const AccessToken = token.jwt.AccessToken
// const ChatGrant = AccessToken.ChatGrant;

@Injectable({
  providedIn: 'root',
})
export class TwilioConversationService {
  private baseUri = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  createAccessToken() {
    return this.httpClient
      .get<any>(this.baseUri + '/user/conversations/token', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getConversations(sessionData) {
    return this.httpClient
      .post<any>(this.baseUri + '/conversations', sessionData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getVideoRoomToken(sessionData) {
    return this.httpClient
      .post<any>(this.baseUri + '/room/token', sessionData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  joinRoom(sessionData) {
    return this.httpClient
      .post<any>(this.baseUri + '/room/join', sessionData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createNewConversation(user_id) {
    return this.httpClient
      .post<any>(
        this.baseUri + '/conversations/create',
        { to: user_id },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteConversation(convoSid) {
    /*this.httpOptions.headers.append('Authorization','Basic ' + btoa('ACf2cc84e73f311b5bc821ee8582a1e6d8:69815c0adf7f62f7b1cfdc6719ad673e'))
      this.httpOptions.headers.append('postman-token', '2498d922-e26e-97a2-4bc2-ca5052b29fe7')
      this.httpOptions.headers.append('cache-control', 'no-cache')*/
    return this.httpClient
      .delete<any>(
        this.baseUri + '/conversations/' + convoSid,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
