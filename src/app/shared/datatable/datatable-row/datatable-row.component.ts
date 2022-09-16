import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatableDisplayedColumn, Tag } from '../datatable.model';

import { DatableTableAction } from '../action.model';
import moment from 'moment';

@Component({
  selector: '[datatable-row]',
  templateUrl: './datatable-row.component.html',
  styleUrls: ['./datatable-row.component.scss'],
})
export class DataTableRowComponent implements OnInit {
  @Input() set row(value) {
    this._row = value;
  }
  get row() {
    return this._row;
  }
  _row: any = {};
  @Input() displayedColomnList: DatableDisplayedColumn[] = [];
  @Input() Actions: DatableTableAction[] = [];
  @Input() checkboxes: boolean = false;
  @Input() textalign: any = 'left';
  @Input() sortByItem: any;

  // when row clicked
  @Output() onrowClicked = new EventEmitter();
  @Output() onActionClicked = new EventEmitter();
  @Output() onckeckBoxClicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  rowClicked(row: any) {
    this.onrowClicked.emit(row);
  }

  actionClicked(action: any, item: any) {
    this.onActionClicked.emit({ item: item, action: action.type });
  }

  ckeckBoxClicked(row) {
    this.onckeckBoxClicked.emit(row);
  }

  formatDate(data: any): string {
    return moment(data).format('DD/MM/YYYY');
  }

  formatPrice(price: string) {
    const nb = parseInt(price);
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(nb).slice(1) + ' €';
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  renderValue(key: string, value: any) {
    if (!value) {
      return '-';
    }

    if (key === 'price' || key === 'amount') {
      return this.formatPrice(value);
    }

    if (key === 'createdAt') {
      return this.formatDate(value);
    }
    return value;
  }
}
