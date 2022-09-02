import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueRoutingModule } from './services-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ServiceAddComponent } from './service-add/service-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';

@NgModule({
  declarations: [
    ServiceCardComponent,
    ServicesListComponent,
    ServiceAddComponent,
    ServiceFormComponent,
    ServiceEditComponent,
  ],
  exports: [ServiceCardComponent, ServicesListComponent],
  imports: [
    CommonModule,
    BoutiqueRoutingModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    ModalModule,
  ],
})
export class ServicesModule {}
