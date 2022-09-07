import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RdvRoutingModule } from './rdv-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { ServiceInfoComponent } from './formation-detail/service-info/service-info.component';
import { LoadingCardModule } from 'src/app/shared/loading-card/loading-card.module';
import { DatatableModule } from 'src/app/shared/datatable/datatable.module';
import { RdvListComponent } from './rdv-list/rdv-list.component';
import { RdvDetailComponent } from './rdv-detail/rdv-detail.component';
import { CountdownModule } from 'ngx-countdown';
import { RdvPayComponent } from './rdv-pay/rdv-pay.component';
import { RdvReservationComponent } from './rdv-reservation/rdv-reservation.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    FormationDetailComponent,
    ServiceInfoComponent,
    RdvListComponent,
    RdvDetailComponent,
    RdvPayComponent,
    RdvReservationComponent,
  ],
  imports: [
    CommonModule,
    RdvRoutingModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
    LoadingCardModule,
    DatatableModule,
    CountdownModule,
    NgSelectModule,
  ],
})
export class RdvModule {}
