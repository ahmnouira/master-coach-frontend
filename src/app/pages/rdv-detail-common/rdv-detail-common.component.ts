import {Component, OnInit, ViewChild} from '@angular/core';

import * as moment from 'moment';
import {CountdownComponent} from "ngx-countdown";
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service.service";

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'app-rdv-detail-common',
  templateUrl: './rdv-detail-common.component.html',
  styleUrls: ['./rdv-detail-common.component.scss']
})
export class RdvDetailCommonComponent implements OnInit {
  session: any ={}
  coach: any = {}
  config: any = {};
  sessionUsers : any = [];
  leftTime  : any;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  constructor(private router : Router, private userService: UserService) { }

  ngOnInit(): void {
    this.session = history.state?.id?.sessionData;
    this.coach = this.session?.coach;
    this.session.dateString = moment(this.session.date.replace('00:00:00',this.session.time)).format('DD/MM/YYYY');
    this.session.timeString = moment(this.session.date.replace('00:00:00',this.session.time)).format('HH:mm');
    this.session.start = this.session.date.replace('00:00:00',this.session.time);
    this.session.end = this.session.date.replace('00:00:00',this.session.endTime);
    this.session.fullStartDateString = moment(this.session.date.replace('00:00:00',this.session.time)).format('dddd, DD/MM/YYYY');
    this.session.fullDateString = moment(this.session.date.replace('00:00:00',this.session.endTime)).format('dddd, DD/MM/YYYY HH:mm:ss');
    this.session.endTimeString = moment(this.session.date.replace('00:00:00',this.session.endTime)).format('HH');
    this.session.startTimeString = moment(this.session.date.replace('00:00:00',this.session.time)).format('HH');
    if( this.session.status == 'pending') {this.session.statusName = 'En attente';this.session.statusName_class='badge badge-danger badge-width';}
    else if( this.session.status == 'declined') {this.session.statusName = 'Refusé';this.session.statusName_class='badge badge-danger badge-width';}
    else if( this.session.status == 'cancelled') {this.session.statusName = 'Annulé';this.session.statusName_class='badge badge-danger badge-width';}
    else if( this.session.status == 'accepted') {this.session.statusName = 'Accepté, en attente de paiement';this.session.statusName_class='badge badge-dark badge-width';}
    else if( this.session.status == 'paid') {this.session.statusName = 'A venir';this.session.statusName_class='badge badge-dark badge-width';}
    else if( this.session.status == 'ongoing') {this.session.statusName = 'En cours';this.session.statusName_class='badge badge-warning badge-width';}
    else if( this.session.status == 'done') {this.session.statusName = 'Terminé';this.session.statusName_class='badge badge-success badge-width';}
    let moment1 = moment(this.session.date.replace('00:00:00',this.session.time));
    let moment2 = moment(new Date());
    this.leftTime = moment1.diff(moment2, "seconds");
    console.log(moment1)
    console.log(moment2)
    console.log(this.leftTime)
    this.config = {
      leftTime: this.leftTime,
      formatDate: ({ date, formatStr }) => {
        let duration = Number(date || 0);

        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
              return v.toString().padStart(match.length, '0');
            });
          }
          return current;
        }, formatStr);
      },
    }
    this.userService.getSingleUser(this.session?.coach).subscribe(
      user => {
        console.log(user);
        this.coach = user;
        this.session.coachName = this.coach.prenom + ' ' + this.coach.nom;
      },
      error => { return {};}
    )
    this.session.users.forEach(
      user => {
        this.userService.getSingleUser(user).subscribe(
          data => {
            this.sessionUsers.push(data);
            this.session.title = this.sessionUsers[0].prenom + ' ' + this.sessionUsers[0].nom;
          },
          error => { return {};}
        )
      }
    )


  }

  isTimeAndDay() {
    let moment1 = moment(this.session.date.replace('00:00:00',this.session.time));
    let moment2 = moment(new Date());
    console.log(Math.abs(moment1.diff(moment2, "minutes")))
    return  Math.abs(moment1.diff(moment2, "minutes")) < 60;
  }

  joinVideo() {
    this.router.navigate(['/pages/video'], { queryParams: { rdv: this.session._id } });
  }

}
