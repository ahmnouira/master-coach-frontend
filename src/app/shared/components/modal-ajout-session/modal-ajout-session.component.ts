import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RdvService } from '../../../services/rdv.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, listLocales } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { TokenStorageService } from '../../../services/token-storage.service';
defineLocale('fr', frLocale);

@Component({
  selector: 'app-modal-ajout-session',
  templateUrl: './modal-ajout-session.component.html',
  styleUrls: ['./modal-ajout-session.component.scss'],
})
export class ModalAjoutSessionComponent implements OnInit {
  coach: any = {};
  teams: any = [];
  isPlannif = false;
  isIndividual = true;
  isTeamSession = false;
  heureDeb: Date = new Date();
  heureFin: Date = new Date();
  minTime: Date = new Date();
  maxDebutTime: Date = new Date();
  maxTime: Date = new Date();
  selectedDate: any = new Date();
  selectedTimezone: any = 'Europe/Paris';
  selectedUserId: any = '';
  selectedTeamId: any = '';
  locale = 'fr';
  locales = listLocales();

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private rdvService: RdvService,
    private localeService: BsLocaleService,
    private tokenStorageService: TokenStorageService
  ) {
    moment.locale(this.locale);
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    moment.locale(this.locale);
    this.localeService.use(this.locale);
    console.log(this.coach);
    this.minTime.setHours(8, 0);
    this.heureDeb.setHours(8, 0);
    this.heureFin.setHours(10, 0);
    this.maxTime.setHours(20, 0);
    this.maxDebutTime.setHours(18, 0);
  }

  getAllZones() {
    return moment.tz.names();
  }

  ngAfterViewInit() {
    this.ngxSmartModalService
      .getModal('modalajoutsession')
      .onOpen.subscribe((modal) => {
        console.log('opened!', modal.getData());
        this.coach = modal.getData().coach;
        this.teams = modal.getData().teams;
      });
  }

  checkboxChanged(event, type) {
    if (type == 'team') {
      this.isIndividual = !event.target.value;
      this.isTeamSession = event.target.value;
    } else {
      this.isIndividual = event.target.value;
      this.isTeamSession = !event.target.value;
    }
  }

  saveSession() {
    console.log(moment(this.selectedDate).tz(this.selectedTimezone).format());
    console.log(this.selectedTeamId);
    let param = {
      data: {
        date: moment(this.selectedDate)
          .tz(this.selectedTimezone)
          .format('YYYY-MM-DD'),
        time: moment(this.heureDeb).format('HH:mm:ss'),
        endTime: moment(this.heureFin).format('HH:mm:ss'),
        users: this.isIndividual
          ? [this.selectedUserId]
          : [
              ...this.teams.filter((elem) => elem._id == this.selectedTeamId)[0]
                .users,
            ],
        coach: this.coach._id,
        status: 'accepted',
        timeZone: this.selectedTimezone,
        team: this.isTeamSession ? [this.selectedTeamId] : [],
        in_video: true,
        in_team: !this.isIndividual,
      },
    };
    this.rdvService.createSession(param).subscribe((data) => {
      console.log(data);
      this.ngxSmartModalService.closeLatestModal();
    });
  }

  selectedDateChanged() {
    this.heureDeb.setFullYear(
      this.selectedDate.getYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate()
    );
    this.heureFin.setFullYear(
      this.selectedDate.getYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate()
    );
  }
}
