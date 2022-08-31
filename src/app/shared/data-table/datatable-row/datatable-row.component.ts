import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatableDisplayedColumn, Tag } from '../datatable.model';

import { DatableTableAction } from '../action.model';

@Component({
  selector: '[datatable-row]',
  templateUrl: './datatable-row.component.html',
  styleUrls: ['./datatable-row.component.scss'],
})
export class DatatableRowComponent implements OnInit {
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
  rowClicked(row) {
    this.onrowClicked.emit(row);
  }

  actionClicked(action, item) {
    this.onActionClicked.emit({ item: item, action: action.type });
  }

  ckeckBoxClicked(row) {
    this.onckeckBoxClicked.emit(row);
  }
}
