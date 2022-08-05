import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import {PagesRoutingModule} from "./pages-routing.module";
import { SidebarComponent } from './sidebar/sidebar.component';
import {AdminModule} from "./admin/admin.module";
import {CoachModule} from "./coach/coach.module";
import {TraineeModule} from "./trainee/trainee.module";
import { PreviewComponent } from './preview/preview.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { RdvDetailCommonComponent } from './rdv-detail-common/rdv-detail-common.component';
import {ComponentsModule} from "./components/components.module";
import {CountdownModule} from "ngx-countdown";
import { UserProfileComponent } from './user-profile/user-profile.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PagesComponent,
    SidebarComponent,
    PreviewComponent,
    RdvDetailCommonComponent,
    UserProfileComponent
  ],
  exports: [
    SidebarComponent,
    PreviewComponent,
    RdvDetailCommonComponent
  ],
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
  ]
})
export class PagesModule { }
