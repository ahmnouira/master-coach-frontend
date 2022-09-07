import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { AdminModule } from './admin/admin.module';
import { CoachModule } from './coach/coach.module';
import { TraineeModule } from './trainee/trainee.module';
import { SharedModule } from '../shared/shared.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ComponentsModule } from './components/components.module';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../shared/layout/layout.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    AdminModule,
    CoachModule,
    TraineeModule,
    SharedModule,
    NgxSmartModalModule.forChild(),
    ComponentsModule,
    CountdownModule,
    FormsModule,
    LayoutModule
  ],
})
export class PagesModule {}
