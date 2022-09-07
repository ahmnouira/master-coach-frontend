import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerQuizComponent } from './client-quiz/answer-quiz/answer-quiz.component';
import { RdvDetailComponent } from './rdv/rdv-detail/rdv-detail.component';
import { FindCoachComponent } from './client-coach/find-coach/find-coach.component';
import { RdvListComponent } from './rdv/rdv-list/rdv-list.component';
import { RdvPayComponent } from './rdv/rdv-pay/rdv-pay.component';
import { RdvReservationComponent } from './rdv/rdv-reservation/rdv-reservation.component';
import { DetailCoachComponent } from './client-coach/detail-coach/detail-coach.component';

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

  {
    path: 'rdv',
    loadChildren: () =>
      import('./rdv/rdv.module').then((module) => module.RdvModule),
  },

  { path: 'docs/quiz/play', component: AnswerQuizComponent },
  { path: 'rdv/list', component: RdvListComponent },
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
