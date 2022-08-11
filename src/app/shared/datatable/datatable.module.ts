import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DatatableComponent,
  filterData,
  paginatePipe,
} from './datatable.component';

import { DatatableRowModule } from './datatable-row/datatable-row.module';
import { DatatableFooterModule } from './datatable-footer/datatable-footer.module';
import { LoadingRowsModule } from './loading-rows/loading-rows.module';

@NgModule({
  declarations: [DatatableComponent, filterData, paginatePipe],
  imports: [
    CommonModule,
    FormsModule,
    DatatableRowModule,
    DatatableFooterModule,
    LoadingRowsModule,
  ],
  exports: [DatatableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatatableModule {}
