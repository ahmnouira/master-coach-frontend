import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment-timezone';
import { Location } from '@angular/common';
import { RdvService } from 'src/app/services/rdv-service/rdv.service';
import { Service } from 'src/app/models/service/service.model';
import { User } from 'src/app/models/user-model';
import { SessionType } from 'src/app/models/service/service-type.enum';
import { ServiceFormat } from 'src/app/models/service/service-format.enum';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-rdv-reservation',
  templateUrl: './rdv-reservation.component.html',
  styleUrls: ['./rdv-reservation.component.scss'],
})
export class RdvReservationComponent implements OnInit {
  localeString: string = 'fr';
  viewDate: any;


  coach: User & {
    working_hours?: any
  }
  formation: Service;


  isVideoSession = false;
  weekDays = [
    {
      number: 1,
      name: 'Lundi',
      isSelected: true,
    },
    {
      number: 2,
      name: 'Mardi',
      isSelected: true,
    },
    {
      number: 3,
      name: 'Mercredi',
      isSelected: true,
    },
    {
      number: 4,
      name: 'Jeudi',
      isSelected: true,
    },
    {
      number: 5,
      name: 'Vendredi',
      isSelected: true,
    },
    {
      number: 6,
      name: 'Samedi',
      isSelected: false,
    },
    {
      number: 7,
      name: 'Dimanche',
      isSelected: false,
    },
  ];
  selectedTimeZone: any = 'Europe/Paris';
  availableHours = [];
  gridArr: any;
  selectedDate: any;
  heureDeb: Date = new Date();
  heureFin: Date = new Date();
  workingHours = 0;
  selectedAppointments: any = [];
  coachAppointments: any = [];
  selectedAppointmentIndex = 0;

  constructor(
    private routeService: RouteService,
    private rdvService: RdvService
  ) {
    moment.locale(this.localeString);
    this.viewDate = moment();
    this.selectedDate = moment();
    this.makeGrid();
  }

  ngOnInit(): void {

   
    let passedData = history?.state?.id as Service;

    if(!passedData) {
        this.routeService.back()
        return
    }

    this.coach = passedData?.user;
    this.formation = passedData
    this.isVideoSession = passedData?.format === ServiceFormat.CONFERENCE;


    this.getCoachSessions(this.coach._id);
    if (this.coach?.working_hours) {
      this.weekDays = this.coach.working_hours.weekdays;
      this.heureDeb = this.coach.working_hours.heureDeb;
      this.heureFin = this.coach.working_hours.heureFin;
    } else {
      this.heureDeb.setHours(8, 0);
      this.heureFin.setHours(20, 0);
    }
    this.workingHours = moment
      .duration(moment(this.heureFin).diff(moment(this.heureDeb)))
      .asHours();
    for (let i = 0; i <= this.workingHours; i++) {
      this.availableHours.push({
        creneauNumber: i,
        creneauText: moment(this.heureDeb).add(i, 'hours').format('HH:mm'),
        isSelected: false,
      });
    }
    this.availableHours[0].isSelected = true;
    this.selectedAppointments.push({
      appointmentIndex: 0,
      selectedDate: moment(),
      heureDeb: this.heureDeb,
      heureFin: this.heureFin,
      selectedTimes: JSON.parse(JSON.stringify(this.availableHours)),
      selectedTimeZone: 'Europe/Paris',
    });

    moment.locale(this.localeString);
    this.viewDate = moment();
    this.selectedDate = moment();
    this.makeGrid();
  }

  changeViewDate(num, datePart) {
    this.viewDate.add(num, datePart);
    this.makeGrid();
  }
  makeGrid() {
    this.gridArr = [];

    let firstDayDate = moment(this.viewDate).startOf('month');
    const daysInMonth = Array.from(
      { length: this.viewDate.daysInMonth() },
      (x, i) => this.viewDate.startOf('month').add(i, 'days')
    );

    daysInMonth.forEach((day) => {
      let obj: any = {};
      obj.value = firstDayDate.format('DD');
      obj.name = firstDayDate.format('ddd');
      obj.isAvailable = this.isAvailable(firstDayDate.isoWeekday());
      firstDayDate.add(1, 'day');
      this.gridArr.push(obj);
    });
  }
  isAvailable(num: number): boolean {
    if (this.weekDays.length == 0) return true;
    else
      return this.weekDays.filter((day) => day.number + 1 == num)[0]
        ?.isSelected;
  }

  onDateClick(day) {
    this.selectedAppointments[this.selectedAppointmentIndex].selectedDate =
      moment(day.value + '/' + this.viewDate.format('MM/YYYY'), 'DD/MM/YYYY');
    this.selectedDate = moment(
      day.value + '/' + this.viewDate.format('MM/YYYY'),
      'DD/MM/YYYY'
    );
  }

  onTimeClick(time, appointmentIndex) {
    this.selectedAppointments[appointmentIndex].selectedTimes.forEach(
      (elem) => {
        if (elem.creneauNumber == time.creneauNumber) {
          elem.isSelected = true;
        } else {
          elem.isSelected = false;
        }
      }
    ); /*
    if(this.selectedAppointments[appointmentIndex].selectedTimes.filter(elem => elem.isSelected).length <2)  {
      time.isSelected = !time.isSelected;
    } else {
      time.isSelected = false;
    }*/
  }
  goToPayment() {
    this.selectedAppointments.forEach((elem) => {
      elem.formattedDate = elem.selectedDate.format('dddd, DD/MM/YYYY');
    });
    let data = {
      coach: this.coach,
      formation: this.formation,
      selectedAppointments: JSON.stringify(this.selectedAppointments),
      selectedCreneau: {
        selectedDate: this.selectedDate.format('dddd, DD/MM/YYYY'),
        selectedTime: this.availableHours.filter((elem) => elem.isSelected)[0],
        selectedTimeZone: this.selectedTimeZone,
      },
      isVideoSession: this.isVideoSession,
    };
    this.routeService.navigateByUrl('/pages/client/rdv/pay', { state: { id: data } });
  }

  back() {
    this.routeService.back();
  }

  getAllZones() {
    return moment.tz.names();
  }

  addNewAappointment() {
    this.selectedAppointments.push({
      appointmentIndex: this.selectedAppointments.length,
      selectedDate: moment(),
      heureDeb: this.heureDeb,
      heureFin: this.heureFin,
      selectedTimes: JSON.parse(JSON.stringify(this.availableHours)),
      selectedTimeZone: 'Europe/Paris',
    });
    this.selectedAppointmentIndex = 0;
  }

  removeDate(index) {
    this.selectedAppointments.splice(index, 1);
    this.selectedAppointmentIndex = 0;
  }

  getCoachSessions(coachId) {
    this.rdvService.getSessions(coachId).subscribe(
      (data) => {
        this.coachAppointments = [...data.sessions];
        // console.log(data);
      },
      (error) => {}
    );
  }

  isCrenauAvailable(date, cren) {
    // console.log(date);
    let dateFormatted = date.format('YYYY-MM-DD');
    // console.log(cren);
    let apps = this.coachAppointments.filter(
      (elem) =>
        elem.date.includes(dateFormatted) &&
        elem.time.includes(cren.creneauText)
    );
    if (apps.length == 0) return true;
    else return false;
  }
}
