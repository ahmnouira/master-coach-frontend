import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerQuizComponent } from './client-quiz/answer-quiz/answer-quiz.component';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { RdvListComponent } from './rdv-list/rdv-list.component';
import { RdvReservationComponent } from './rdv-reservation/rdv-reservation.component';
import { RdvPayComponent } from './rdv-pay/rdv-pay.component';
import { RdvDetailComponent } from './rdv-detail/rdv-detail.component';
import { FindCoachComponent } from './find-coach/find-coach.component';
import { DetailCoachComponent } from './detail-coach/detail-coach.component';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(
        (module) => module.SettingsModule
      ),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },

  {
    path: 'coaches',
    loadChildren: () =>
      import('./client-coach/client-coach.module').then(
        (module) => module.ClientCoachModule
      ),
  },

  { path: 'coach-list', component: FindCoachComponent },

  { path: 'coach-detail', component: DetailCoachComponent },

  {
    path: 'documents',
    loadChildren: () =>
      import('./documents/documents.module').then(
        (module) => module.DocumentsModule
      ),
  },

  {
    path: 'purchases',
    loadChildren: () =>
      import('./purchases/purchases.module').then(
        (module) => module.PurchasesModule
      ),
  },

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
