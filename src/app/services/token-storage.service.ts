import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const TWILIO_TOKEN_KEY = 'twilio-token';
const TWILIO_TOKEN_VIDEO_KEY = 'twilio-video-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public getTwilioToken () : string|null {
    return window.localStorage.getItem(TWILIO_TOKEN_KEY);
  }

  public saveTwilioToken (token:string) : void {
    window.localStorage.removeItem(TWILIO_TOKEN_KEY);
    window.localStorage.setItem(TWILIO_TOKEN_KEY, token);
  }

  public getTwilioVideoToken () : string|null {
    return window.localStorage.getItem(TWILIO_TOKEN_VIDEO_KEY);
  }

  public saveTwilioVideoToken (token:string) : void {
    window.localStorage.removeItem(TWILIO_TOKEN_VIDEO_KEY);
    window.localStorage.setItem(TWILIO_TOKEN_VIDEO_KEY, token);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    let value = JSON.stringify(user);
    window.localStorage.setItem(USER_KEY, value);
  }

  public getUser(): any {
    let user = window.localStorage.getItem(USER_KEY)
    if(user) return JSON.parse(user)
    return {}
  }

  public isReadOnly(): boolean | null {
      const user = this.getUser();
      return !(user.role?.toLowerCase() === 'admin');
  }


}
