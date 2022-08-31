import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DataTableRowComponent } from './datatable-row.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { DatatableCheckboxTemplateModule } from '../datatable-checkbox-template/datatable-checkbox-template.module';
import { DatatableInputcheckboxTemplateModule } from '../datatable-inputcheckbox-template/datatable-inputcheckbox-template.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MomentModule } from 'ngx-moment';
import { RouterModule } from '@angular/router';
import { ActionItemComponent } from './action-item/action-item.component';

@NgModule({
  declarations: [DataTableRowComponent, ActionItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MomentModule,
    TooltipModule.forRoot(),
    DatatableCheckboxTemplateModule,
    DatatableInputcheckboxTemplateModule,
    RouterModule,
  ],
  providers: [DatePipe],
  exports: [DataTableRowComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatatableRowModule {}
