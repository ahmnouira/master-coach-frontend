import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { CcListComponent } from './cc-list/cc-list.component';
import { CcAddComponent } from './cc-add/cc-add.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { RouterModule } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { ClientItemComponent } from './client-item/client-item.component';
import { ClientInvitedListComponent } from './client-invited-list/client-invited-list.component';
import { ClientAllListComponent } from './client-all-list/client-all-list.component';

@NgModule({
  declarations: [
    CcListComponent,
    CcAddComponent,
    ClientFormComponent,
    ClientListComponent,
    ClientCardComponent,
    ClientItemComponent,
    ClientInvitedListComponent,
    ClientAllListComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    AngularMultiSelectModule,
    ModalModule,
  ],
})
export class ClientsModule {}
