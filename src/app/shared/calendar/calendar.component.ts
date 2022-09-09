import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  data: any = [];

  sessionList: any = [];

  @Input() viewDate: any;
  @Input() local: string = 'fr';
  selectedDate: any;

  gridArr: any;

  constructor() {}

  ngOnInit(): void {
    moment.locale(this.local);
    this.viewDate = moment();
    this.selectedDate = moment();
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

  changeViewDate(num, datePart) {
    this.viewDate.add(num, datePart);
    this.makeGrid();
  }

  isAvailable(num: number): boolean {
    return true;
    //return this.weekDays.filter(day => day.number +1 == num)[0]?.isSelected;
  }

  onDateClick(day: any) {
    console.log('day', day);

    const date = moment(
      day.value + '/' + this.viewDate.format('MM/YYYY'),
      'DD/MM/YYYY'
    );
    this.selectedDate = date;

    // return data

    this.sessionList = this.data.filter((elem) =>
      elem?.date?.toLowerCase().includes(date.format('YYYY-MM-DD'))
    );
  }
}
