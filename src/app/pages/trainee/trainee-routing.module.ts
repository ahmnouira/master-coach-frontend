import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerQuizComponent } from './client-quiz/answer-quiz/answer-quiz.component';
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

  { path: 'coach-detail', component: DetailCoachComponent },

  {
    path: 'documents',
    loadChildren: () =>
      import('./documents/documents.module').then(
        (module) => module.DocumentsModule
      ),
  },

  { path: 'docs/quiz/play', component: AnswerQuizComponent },

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

  {
    path: 'library',
    loadChildren: () =>
      import('./library/library.module').then((module) => module.LibraryModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraineeRoutingModule {}
