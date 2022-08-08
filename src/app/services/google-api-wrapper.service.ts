import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

declare var gapi: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleApiWrapperService {
  calendarItems: any[];
  public auth2: any;
  public user$: any;
  public currentUser: any;
  public currentUserProfile: any;
  public currentUserEmail: any;
  public isConnected = false;
  googleCalendarEvents = new Subject();

  constructor(private zone: NgZone, private http: HttpClient) {
    this.initClient();
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyC4JrwGP0r-ucLUq9g277ouH1nHpI-tVpE',
        clientId: '140058966186-d91oisqcf04ndem497152osjcaehohvv.apps.googleusercontent.com',
        plugin_name: "mastercoach",
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })

      gapi.client.load('calendar', 'v3', () => {
        console.log('loaded calendar')
        let isConnected = gapi?.auth2?.getAuthInstance()?.isSignedIn.get();
        this.isConnected = isConnected;
        if(isConnected) {
          this.getCalendar().then(r => {
            this.googleCalendarEvents.next(r);
            this.calendarItems = [...r];
          });
          this.currentUser = gapi?.auth2?.getAuthInstance()?.currentUser.get();
          this.currentUserProfile = gapi?.auth2?.getAuthInstance()?.currentUser.get().getBasicProfile();
          this.currentUserEmail = gapi?.auth2?.getAuthInstance()?.currentUser.get()?.getBasicProfile()?.getEmail();
        }
      });
    });
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance()
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;
    if(token) await this.getCalendar();

  }

  logout() {
    gapi?.auth2?.getAuthInstance()?.signOut().then(res => {return res;});
  }
  async isSignedIn() {
    return await gapi?.auth2?.getAuthInstance()?.isSignedIn.get()
  }

  getCurrentUser() {
    return gapi.auth2.getAuthInstance().currentUser.get();
  }

  async getCurrentUserEmail() {
    return await gapi?.auth2?.getAuthInstance()?.currentUser.get().getBasicProfile().getEmail();
  }

  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 1000,
      orderBy: 'startTime'
    })

    console.log(events)

    this.calendarItems = events.result.items;
    return this.calendarItems;
  }

  async insertEvent() {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: hoursFromNow(2),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: hoursFromNow(3),
        timeZone: 'Europe/Paris'
      },
      summary: 'Have Fun!!!',
      description: 'Do some cool stuff and have a fun time doing it'
    })

    await this.getCalendar();
  }

  async addEventToPrimaryCalendar(event: any) {
    const insert = await gapi.client.calendar.events.insert(event);
    await this.getCalendar();
  }


}

const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();

