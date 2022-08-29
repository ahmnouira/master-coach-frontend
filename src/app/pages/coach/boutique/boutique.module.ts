import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueRoutingModule } from './boutique-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BoutiqueListComponent } from './boutique-list/boutique-list.component';
import { BoutiqueCardComponent } from './boutique-card/boutique-card.component';
import { BoutiqueAddComponent } from './boutique-add/boutique-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoutiqueFormComponent } from './boutique-form/boutique-form.component';
import { BoutiqueEditComponent } from './boutique-edit/boutique-edit.component';

@NgModule({
  declarations: [
    BoutiqueCardComponent,
    BoutiqueListComponent,
    BoutiqueAddComponent,
    BoutiqueFormComponent,
    BoutiqueEditComponent,
  ],
  exports: [BoutiqueCardComponent],

  imports: [
    CommonModule,
    BoutiqueRoutingModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    AngularMultiSelectModule,
    ModalModule,
  ],
})
export class BoutiqueModule {}
