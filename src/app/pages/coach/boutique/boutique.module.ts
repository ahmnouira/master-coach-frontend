import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueRoutingModule } from './boutique-routing.module';
import { CcListComponent } from '../coach-client-management/cc-list/cc-list.component';
import { CcAddComponent } from '../coach-client-management/cc-add/cc-add.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BoutiqueListComponent } from './boutique-list/boutique-list.component';

@NgModule({
  declarations: [CcListComponent, CcAddComponent, BoutiqueListComponent],
  imports: [
    CommonModule,
    BoutiqueRoutingModule,
    ComponentsModule,
    FormsModule,
    ModalModule,
  ],
})
export class CoachClientManagementModule {}
