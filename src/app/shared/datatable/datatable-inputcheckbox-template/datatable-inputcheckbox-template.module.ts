import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatatableInputcheckboxTemplateComponent } from "./datatable-inputcheckbox-template.component";

@NgModule({
  declarations: [DatatableInputcheckboxTemplateComponent],
  imports: [CommonModule,
  FormsModule],
  exports: [DatatableInputcheckboxTemplateComponent]
})
export class DatatableInputcheckboxTemplateModule {}
