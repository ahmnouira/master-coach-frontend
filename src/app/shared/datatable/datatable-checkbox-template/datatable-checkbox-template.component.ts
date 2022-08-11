import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[datatable-checkbox-template]',
  template: `
    <span class="checkboxTemplate">
      <input
        [disabled]="row.checkboxDisabled"
        [(ngModel)]="row.selected"
        (change)="ckeckBoxClicked(row)"
        [id]="'checkboxTemplate_' + row.id"
        class="w-0 field-checkbox"
        type="checkbox"
        [name]="'checkboxTemplate_' + row.id"
      />
      <label [for]="'checkboxTemplate_' + row.id"></label>
    </span>
  `,
  styles: [],
})
export class DatatableCheckboxTemplateComponent implements OnInit {
  @Input() row: any = {};
  @Output() onckeckBoxClicked = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  ckeckBoxClicked(row) {
    this.onckeckBoxClicked.emit(row);
  }
}
