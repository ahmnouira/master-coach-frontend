import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RdvRoutingModule } from './rdv-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { ServiceInfoComponent } from './formation-detail/service-info/service-info.component';

@NgModule({
  declarations: [FormationDetailComponent, ServiceInfoComponent],
  imports: [
    CommonModule,
    RdvRoutingModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
  ],
})
export class RdvModule {}
