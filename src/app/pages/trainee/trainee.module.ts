import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeRoutingModule } from './trainee-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { AnswerQuizComponent } from './client-quiz/answer-quiz/answer-quiz.component';
import { LoadingCardModule } from '../../shared/loading-card/loading-card.module';
import { DatatableModule } from '../../shared/datatable/datatable.module';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DetailCoachComponent } from './client-coach/detail-coach/detail-coach.component';

@NgModule({
  declarations: [AnswerQuizComponent, DetailCoachComponent],
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
