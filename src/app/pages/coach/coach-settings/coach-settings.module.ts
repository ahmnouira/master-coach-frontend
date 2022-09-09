import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachSettingsRoutingModule } from './coach-settings-routing.module';
import { CoachSettingsComponent } from './coach.settings.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoachMenuComponent } from '../coach-menu/coach-menu.component';

@NgModule({
  declarations: [CoachSettingsComponent, CoachMenuComponent],
  imports: [
    CommonModule,
    CoachSettingsRoutingModule,
    FormsModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [CoachMenuComponent],
})
export class CoachSettingsModule {}
