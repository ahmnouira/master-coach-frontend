import {Component, OnInit, ViewChild} from '@angular/core';

import * as moment from 'moment';
import {CountdownComponent} from "ngx-countdown";
import {Router} from "@angular/router";

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
  selector: 'app-rdv-detail',
  templateUrl: './rdv-detail.component.html',
  styleUrls: ['./rdv-detail.component.scss']
})
export class RdvDetailComponent implements OnInit {

  session: any ={}
  coach: any = {}
  config: any = {}
  leftTime  : any;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.session = history.state?.id;
    this.coach = history.state?.id.coach;
    this.coach.competances = this.coach.competance.map(elem => elem.name).join(' - ');
    this.session.dateString = moment(this.session.date.replace('00:00:00',this.session.time)).format('DD/MM/YYYY')
    this.session.timeString = moment(this.session.date.replace('00:00:00',this.session.time)).format('HH:mm')
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
  }

  isTimeAndDay() {
    let moment1 = moment(this.session.date.replace('00:00:00',this.session.time));
    let moment2 = moment(new Date());
    return  Math.abs(moment1.diff(moment2, "minutes")) < 90 ;
  }

  joinVideo() {
    this.router.navigate(['/pages/video'], { queryParams: { rdv: this.session._id } });
  }


}
