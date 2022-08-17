import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueRoutingModule } from './services-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceCardComponent } from './service-card/service-card.component';

@NgModule({
  declarations: [ServiceCardComponent, ServicesListComponent],
  imports: [
    CommonModule,
    BoutiqueRoutingModule,
    ComponentsModule,
    FormsModule,
    ModalModule,
  ],
})
export class ServicesModule {}
