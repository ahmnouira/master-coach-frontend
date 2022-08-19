import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PlanCardComponent } from './plan-card/plan-card.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlansRoutingModule } from './plans-routing.module';
import { CoachMenuComponent } from './coach-menu/coach-menu.component';

@NgModule({
  declarations: [PlanCardComponent, PlanListComponent, CoachMenuComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ModalModule,
    PlansRoutingModule
  ],  
})
export class PlansModule {}
