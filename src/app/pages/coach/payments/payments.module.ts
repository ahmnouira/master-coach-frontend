import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { LoadingCardModule } from 'src/app/shared/loading-card/loading-card.module';
import { DatatableModule } from 'src/app/shared/datatable/datatable.module';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentsListComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule,
    ComponentsModule,
    LoadingCardModule,
    DatatableModule,
    FormsModule,
  ],
})
export class PaymentsModule {}
