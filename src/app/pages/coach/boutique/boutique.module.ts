import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueRoutingModule } from './boutique-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BoutiqueListComponent } from './boutique-list/boutique-list.component';
import { BoutiqueCardComponent} from './boutique-card/boutique-card.component'

@NgModule({
  declarations: [BoutiqueCardComponent, BoutiqueListComponent],
  imports: [
    CommonModule,
    BoutiqueRoutingModule,
    ComponentsModule,
    FormsModule,
    ModalModule,
  ],
})
export class CoachClientManagementModule {}
