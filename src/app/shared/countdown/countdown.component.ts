import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { CountdownComponent as NgxCountdownComponent} from 'ngx-countdown';

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
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})

export class CountdownComponent implements OnInit {

  config: any

  session: any

  leftTime: any;
  @ViewChild('cd', { static: false }) private countdown: NgxCountdownComponent;

  constructor() { }

  ngOnInit(): void {


    this.session.dateString = moment(
      this.session.date.replace('00:00:00', this.session.time)
    ).format('DD/MM/YYYY');
    this.session.timeString = moment(
      this.session.date.replace('00:00:00', this.session.time)
    ).format('HH:mm');

    let moment1 = moment(
      this.session.date.replace('00:00:00', this.session.time)
    );

    let moment2 = moment(new Date());
    this.leftTime = moment1.diff(moment2, 'seconds');

    this.config = {
      leftTime: this.leftTime,
      formatDate: ({ date, formatStr }) => {
        let duration = Number(date || 0);

        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(
              new RegExp(`${name}+`, 'g'),
              (match: string) => {
                return v.toString().padStart(match.length, '0');
              }
            );
          }
          return current;
        }, formatStr);
      },
    };
  }

}
