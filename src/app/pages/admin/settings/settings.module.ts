import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class SettingsModule {}
