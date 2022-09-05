import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilCoachComponent } from './profil-coach/profil-coach.component';
import { ViewFormQuizComponent } from './view-form-quiz/view-form-quiz.component';
import { AddFormQuizComponent } from './add-form-quiz/add-form-quiz.component';
import { ListFormQuizComponent } from './list-form-quiz/list-form-quiz.component';
import { EditFormQuizComponent } from './edit-form-quiz/edit-form-quiz.component';
import { ViewTeamComponent } from './view-team/view-team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { ListTeamsComponent } from './list-teams/list-teams.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { MessagerieComponent } from 'src/app/shared/components/messagerie/messagerie.component';
import { AccountVerifiedGuard } from 'src/app/guards/account-verified/account-verified.guard';

const routes: Routes = [


  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(
        (module) => module.SettingsModule
      ),
  },

  {
    path: 'profil',
    component: ProfilCoachComponent,
    // canActivate: [AccountVerifiedGuard],
  },

  {
    path: 'plans',
    loadChildren: () =>
      import('./plans/plans.module').then((module) => module.PlansModule),
  },

  {
    path: 'services',
    loadChildren: () =>
      import('./services/services.module').then(
        (module) => module.ServicesModule
      ),
    // canActivate: [AccountVerifiedGuard],
  },

  {
    path: 'coach-client',
    loadChildren: () =>
      import('./coach-client-management/coach-client-management.module').then(
        (module) => module.CoachClientManagementModule
      ),
    // canActivate: [AccountVerifiedGuard],
  },

  {
    path: 'payments',
    loadChildren: () =>
      import('./payments/payments.module').then(
        (module) => module.PaymentsModule
      ),

    //  canActivate: [AccountVerifiedGuard],
  },

  {
    path: 'boutique',
    loadChildren: () =>
      import('./boutique/boutique.module').then(
        (module) => module.BoutiqueModule
      ),
    // canActivate: [AccountVerifiedGuard],
  },

  {
    path: 'documents',
    loadChildren: () =>
      import('./documents/documents.module').then(
        (module) => module.DocumentsModule
      ),
    //canActivate: [AccountVerifiedGuard],
  },

 

  { path: 'quiz/view', component: ViewFormQuizComponent },
  { path: 'quiz/add', component: AddFormQuizComponent },
  { path: 'quiz/list', component: ListFormQuizComponent },
  { path: 'quiz/edit', component: EditFormQuizComponent },
  { path: 'coach-client/team/view', component: ViewTeamComponent },
  { path: 'coach-client/team/add', component: AddTeamComponent },
  { path: 'coach-client/team/list', component: ListTeamsComponent },
  { path: 'coach-client/team/edit', component: EditFormQuizComponent },
  {
    path: 'calendar',
    component: MyAppointmentsComponent,
    // canActivate: [AccountVerifiedGuard],
  },

  { path: '', redirectTo: 'settings', pathMatch: 'full' },

  { path: '**', redirectTo: 'settings', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachRoutingModule {}
