import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeRoutingModule } from './trainee-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ParametresComponent } from './parametres/parametres.component';
import { FormsModule } from '@angular/forms';
import { FindCoachComponent } from './find-coach/find-coach.component';
import { MesDocQuizComponent } from './client-quiz/mes-doc-quiz/mes-doc-quiz.component';
import { AnswerQuizComponent } from './client-quiz/answer-quiz/answer-quiz.component';
import { LoadingCardModule } from '../../shared/loading-card/loading-card.module';
import { DatatableModule } from '../../shared/datatable/datatable.module';
import { DetailCoachComponent } from './detail-coach/detail-coach.component';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { RdvListComponent } from './rdv-list/rdv-list.component';
import { RdvReservationComponent } from './rdv-reservation/rdv-reservation.component';
import { RdvPayComponent } from './rdv-pay/rdv-pay.component';
import { RdvDetailComponent } from './rdv-detail/rdv-detail.component';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ParametresComponent,
    FindCoachComponent,
    MesDocQuizComponent,
    AnswerQuizComponent,
    DetailCoachComponent,
    FormationDetailComponent,
    RdvListComponent,
    RdvReservationComponent,
    RdvPayComponent,
    RdvDetailComponent,
  ],
  imports: [
    CommonModule,
    TraineeRoutingModule,
    ComponentsModule,
    FormsModule,
    LoadingCardModule,
    DatatableModule,
    CountdownModule,
    SharedModule,
    NgSelectModule,
  ],
  providers: [{ provide: Window, useValue: window }],
})
export class TraineeModule {}
