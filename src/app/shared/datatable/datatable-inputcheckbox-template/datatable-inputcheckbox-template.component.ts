import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "[datatable-inputcheckbox-template]",
  template: `
    <span class="custom-control custom-checkbox">
      <input
        type="checkbox"
        [style.text-align]="textalign"
        [id]="'InputcheckboxTemplate_' + row.id"
        [name]="'InputcheckboxTemplate_' + row.id"
        (ngModelChange)="onInputChanged(row, title)"
        [readonly]="!allEnabled || row.disabled"
        class="custom-control-input"
        [(ngModel)]="row[title]"
      />
      <label
        class="custom-control-label"
        [for]="'InputcheckboxTemplate_' + row.id"
      ></label>
    </span>
  `,
  styles: [],
})
export class DatatableInputcheckboxTemplateComponent implements OnInit {
  @Input() textalign: string = "left";
  @Input() row: any = {};
  @Input() allEnabled: boolean = false;
  @Input() title: any;
  @Output() inputChanged = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  onInputChanged(row?, input?) {
    if (row && input) {
      row[input + "Change"] = true;
      this.inputChanged.emit({ item: row, label: input });
    }
  }
}
