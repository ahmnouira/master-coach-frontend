import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachClientManagementRoutingModule } from './coach-client-management-routing.module';
import { CcListComponent } from './cc-list/cc-list.component';
import { CcAddComponent } from './cc-add/cc-add.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { RouterModule } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';

@NgModule({
  declarations: [CcListComponent, CcAddComponent, ClientFormComponent],
  imports: [
    CommonModule,
    CoachClientManagementRoutingModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    AngularMultiSelectModule,
    ModalModule,
  ],
})
export class CoachClientManagementModule {}
