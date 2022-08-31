import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableCheckboxTemplateComponent } from './datatable-checkbox-template.component';

@NgModule({
  declarations: [DatatableCheckboxTemplateComponent],
  imports: [CommonModule, FormsModule],
  exports: [DatatableCheckboxTemplateComponent],
})
export class DatatableCheckboxTemplateModule {}
