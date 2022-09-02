import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilClientComponent } from './profil-client/profil-client.component';
import { ParametresComponent } from './parametres/parametres.component';
import { FindCoachComponent } from './find-coach/find-coach.component';
import { MesDocQuizComponent } from './client-quiz/mes-doc-quiz/mes-doc-quiz.component';
import { AnswerQuizComponent } from './client-quiz/answer-quiz/answer-quiz.component';
import { DetailCoachComponent } from './detail-coach/detail-coach.component';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { RdvListComponent } from './rdv-list/rdv-list.component';
import { RdvReservationComponent } from './rdv-reservation/rdv-reservation.component';
import { RdvPayComponent } from './rdv-pay/rdv-pay.component';
import { RdvDetailComponent } from './rdv-detail/rdv-detail.component';

const routes: Routes = [
  { path: 'profil', component: ProfilClientComponent },
  { path: 'parametre', component: ParametresComponent },
  { path: 'coach-list', component: FindCoachComponent },
  { path: 'coach-detail', component: DetailCoachComponent },
  { path: 'docs', component: MesDocQuizComponent },
  { path: 'docs/quiz/play', component: AnswerQuizComponent },
  { path: 'rdv/list', component: RdvListComponent },
  { path: 'rdv/detail-formation', component: FormationDetailComponent },
  { path: 'rdv/reserver', component: RdvReservationComponent },
  { path: 'rdv/pay', component: RdvPayComponent },
  { path: 'rdv/detail', component: RdvDetailComponent },
  {
    path: 'library',
    loadChildren: () =>
      import('./library/library.module').then((module) => module.LibraryModule),
    //canActivate: [AccountVerifiedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraineeRoutingModule {}
