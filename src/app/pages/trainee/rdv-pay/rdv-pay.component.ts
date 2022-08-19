import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TokenStorageService } from '../../../services/token-storage.service';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { RdvService } from 'src/app/services/rdv-service/rdv.service';

@Component({
  selector: 'app-rdv-pay',
  templateUrl: './rdv-pay.component.html',
  styleUrls: ['./rdv-pay.component.scss'],
})
export class RdvPayComponent implements OnInit {
  coach: any = {};
  formation: any = {};
  selectedDate: any = {};
  isVideoSession = false;
  selectedAppointments: any = [];

  constructor(
    private rdvService: RdvService,
    public modal: NgxSmartModalService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    public window: Window
  ) {}

  ngOnInit(): void {
    this.coach = history.state?.id.coach;
    this.formation = history.state?.id.formation;
    this.isVideoSession = history.state?.id.isVideoSession;
    this.selectedAppointments = JSON.parse(
      history.state?.id.selectedAppointments
    );
    this.selectedAppointments.forEach((elem) => {
      elem.moment = moment(elem.selectedDate);
      elem.selectedTimes.forEach((time) => {
        let hourNumber = Number(time.creneauText.split(':')[0]) + 1;
        let hourString = hourNumber < 10 ? '0' + hourNumber : hourNumber;
        time.endTime = hourString + ':' + time.creneauText.split(':')[1];
      });
      elem.selectedTimes = elem.selectedTimes.filter((elem) => elem.isSelected);
    });
    console.log(this.selectedAppointments);
    this.selectedDate = history.state?.id.selectedCreneau;
    this.selectedDate.selectedTime.endTime =
      Number(this.selectedDate.selectedTime.creneauText.split(':')[0]) +
      1 +
      ':' +
      this.selectedDate.selectedTime.creneauText.split(':')[1];
    this.selectedDate.moment = moment(
      this.selectedDate.selectedDate,
      'dddd, DD/MM/YYYY'
    );
  }

  ngAfterViewInit() {
    this.modal
      .getModal('modalsucces')
      .onClose.subscribe((modal: NgxSmartModalComponent) => {
        // modal is the dismissed modal, so do what you want with it
        this.router.navigate(['/pages/client/rdv/list']);
      });
    this.modal
      .getModal('modalsucces')
      .onDismiss.subscribe((modal: NgxSmartModalComponent) => {
        // modal is the dismissed modal, so do what you want with it
        this.router.navigate(['/pages/client/rdv/list']);
      });
  }

  saveRdv() {
    this.selectedAppointments.forEach((appointment) => {
      appointment.selectedTimes.forEach((rdv) => {
        let param = {
          data: {
            date: appointment.moment.format('YYYY-MM-DD'),
            time: rdv.creneauText + ':00',
            endTime: rdv.endTime + ':00',
            users: [this.tokenStorageService.getUser()._id],
            coach: this.coach._id,
            status: 'pending',
            timeZone: appointment.selectedTimeZone,
            team: [],
            in_video: this.isVideoSession,
            in_team: false,
          },
        };
        console.log(param);
        this.rdvService.createSession(param).subscribe((data) => {
          this.openModal('modalsucces');
          console.log(data);
        });
      });
    });
  }

  openModal(modal) {
    this.modal.getModal(modal).open();
  }
}
