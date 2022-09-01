import { Component, OnInit, Input } from '@angular/core';
import { DatableDisplayedColumn } from '../datatable.model';

import { DatableTableAction } from '../action.model';

@Component({
  selector: '[loading-rows]',
  template: `
    <ng-container>
      <td *ngIf="checkboxes">
        <div class="loading-row"></div>
      </td>
      <td *ngFor="let title of displayedColomnList">
        <div class="loading-row"></div>
      </td>

      <!-- actions List -->

      <td *ngFor="let action of Actions">
        <div class="loading-row"></div>
      </td>
    </ng-container>
  `,
  styleUrls: ['./loading-rows.component.scss'],
})
export class LoadingRowsComponent implements OnInit {
  @Input() displayedColomnList: DatableDisplayedColumn[] = [];
  @Input() Actions: DatableTableAction[] = [];
  @Input() nbRows: number = 4;
  @Input() checkboxes: boolean = false;
  constructor() {}

  ngOnInit() {}
}
