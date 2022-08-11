import { Component, OnInit } from '@angular/core';
import { GoogleApiWrapperService } from '../../../services/google-api-wrapper.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-modal-google-agenda',
  templateUrl: './modal-google-agenda.component.html',
  styleUrls: ['./modal-google-agenda.component.scss'],
})
export class ModalGoogleAgendaComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any = {};
  currentUserProfile: any = {};
  currentUserEmail: any = '';

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public googleService: GoogleApiWrapperService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.ngxSmartModalService
      .getModal('modalgoogleagenda')
      .onOpen.subscribe((modal) => {
        this.currentUser = this.googleService.currentUser;
        this.isLoggedIn = this.googleService.isConnected;
        console.log(this.isLoggedIn);
        console.log(this.currentUser);
        if (this.isLoggedIn) {
          this.currentUser = this.googleService.currentUser;
          this.currentUserProfile = this.googleService.currentUserProfile;
          this.currentUserEmail = this.googleService.currentUserEmail;
          let calendarEvents = this.googleService.calendarItems;
          let data = {
            googleCalendarEvents: calendarEvents,
          };
          this.ngxSmartModalService.setModalData(data, 'modalgoogleagenda');
          this.delay(10000).then((delay) => {
            this.ngxSmartModalService.closeLatestModal();
          });
        }
      });
  }

  async signIn() {
    await this.googleService.login();
    this.isLoggedIn = await this.googleService.isSignedIn();
    console.log(this.isLoggedIn);
    this.currentUser = await this.googleService.getCurrentUser();
    let calendarEvents = this.googleService.calendarItems;
    let data = {
      googleCalendarEvents: calendarEvents,
    };
    this.ngxSmartModalService.setModalData(data, 'modalgoogleagenda');
    await this.delay(2000);
    //this.ngxSmartModalService.closeLatestModal();
  }

  async signOut() {
    await this.googleService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
    this.ngxSmartModalService.closeLatestModal();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
