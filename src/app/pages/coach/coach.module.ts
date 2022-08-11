import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilCoachComponent } from './profil-coach/profil-coach.component';
import { CoachRoutingModule } from './coach-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ParametresComponent } from './parametres/parametres.component';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AddFormQuizComponent } from './add-form-quiz/add-form-quiz.component';
import { ViewFormQuizComponent } from './view-form-quiz/view-form-quiz.component';
import { ListFormQuizComponent } from './list-form-quiz/list-form-quiz.component';
import { EditFormQuizComponent } from './edit-form-quiz/edit-form-quiz.component';
import { ListTeamsComponent } from './list-teams/list-teams.component';
import { ViewTeamComponent } from './view-team/view-team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { DatatableModule } from '../../shared/datatable/datatable.module';
import { LoadingCardModule } from '../../shared/loading-card/loading-card.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClientModule } from '@angular/common/http';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BoutiqueComponent } from './boutique/boutique.component';

FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);

@NgModule({
  declarations: [
    ProfilCoachComponent,
    ParametresComponent,
    AddFormQuizComponent,
    ViewFormQuizComponent,
    ListFormQuizComponent,
    EditFormQuizComponent,
    ListTeamsComponent,
    ViewTeamComponent,
    AddTeamComponent,
    MyAppointmentsComponent,
    BoutiqueComponent,
  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    ComponentsModule,
    FormsModule,
    AngularMultiSelectModule,
    DatatableModule,
    LoadingCardModule,
    TooltipModule,
    ModalModule,
    FullCalendarModule,
    HttpClientModule,
    SharedModule,
    NgxSmartModalModule.forChild(),
  ],
  providers: [BsModalService],
})
export class CoachModule {}
