import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeRoutingModule } from './trainee-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { FindCoachComponent } from './client-coach/find-coach/find-coach.component';
import { AnswerQuizComponent } from './client-quiz/answer-quiz/answer-quiz.component';
import { LoadingCardModule } from '../../shared/loading-card/loading-card.module';
import { DatatableModule } from '../../shared/datatable/datatable.module';
import { RdvDetailComponent } from './rdv/rdv-detail/rdv-detail.component';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RdvListComponent } from './rdv/rdv-list/rdv-list.component';
import { RdvPayComponent } from './rdv/rdv-pay/rdv-pay.component';
import { RdvReservationComponent } from './rdv/rdv-reservation/rdv-reservation.component';
import { DetailCoachComponent } from './client-coach/detail-coach/detail-coach.component';

@NgModule({
  declarations: [
    FindCoachComponent,
    AnswerQuizComponent,
    DetailCoachComponent,
    
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
