import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DatatableRowComponent } from './datatable-row.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { DatatableCheckboxTemplateModule } from '../datatable-checkbox-template/datatable-checkbox-template.module';
import { DatatableInputcheckboxTemplateModule } from '../datatable-inputcheckbox-template/datatable-inputcheckbox-template.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [DatatableRowComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MomentModule,
    TooltipModule.forRoot(),
    DatatableCheckboxTemplateModule,
    DatatableInputcheckboxTemplateModule,
  ],
  providers: [DatePipe],
  exports: [DatatableRowComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatatableRowModule {}
