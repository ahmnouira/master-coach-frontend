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
import { ClientCardEditComponent } from './client-card-edit/client-card-edit.component';
import { ClientCardViewComponent } from './client-card-view/client-card-view.component';
import { ClientCardToolsComponent } from './client-card-tools/client-card-tools.component';
import { ClientCardViewFormComponent } from './client-card-view-form/client-card-view-form.component';
import { ClientCardViewEmptyComponent } from './client-card-view-empty/client-card-view-empty.component';

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
    ClientCardEditComponent,
    ClientCardViewComponent,
    ClientCardToolsComponent,
    ClientCardViewFormComponent,
    ClientCardViewEmptyComponent,
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
