import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilCoachComponent } from './profil-coach/profil-coach.component';
import { ParametresComponent } from './parametres/parametres.component';
import { ViewFormQuizComponent } from './view-form-quiz/view-form-quiz.component';
import { AddFormQuizComponent } from './add-form-quiz/add-form-quiz.component';
import { ListFormQuizComponent } from './list-form-quiz/list-form-quiz.component';
import { EditFormQuizComponent } from './edit-form-quiz/edit-form-quiz.component';
import { ViewTeamComponent } from './view-team/view-team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { ListTeamsComponent } from './list-teams/list-teams.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { MessagerieComponent } from 'src/app/shared/components/messagerie/messagerie.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { PlansComponent } from './plans/plans.component';

const routes: Routes = [
  { path: 'profil', component: ProfilCoachComponent },
  { path: 'parametre', component: ParametresComponent },
  {
    path: 'coach-client',
    loadChildren: () =>
      import('./coach-client-management/coach-client-management.module').then(
        (module) => module.CoachClientManagementModule
      ),
  },
  { path: 'quiz/view', component: ViewFormQuizComponent },
  { path: 'quiz/add', component: AddFormQuizComponent },
  { path: 'quiz/list', component: ListFormQuizComponent },
  { path: 'quiz/edit', component: EditFormQuizComponent },
  { path: 'coach-client/team/view', component: ViewTeamComponent },
  { path: 'coach-client/team/add', component: AddTeamComponent },
  { path: 'coach-client/team/list', component: ListTeamsComponent },
  { path: 'coach-client/team/edit', component: EditFormQuizComponent },
  { path: 'calendar', component: MyAppointmentsComponent },
  { path: 'boutique', component: BoutiqueComponent },
  { path: 'plans', component: PlansComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachRoutingModule {}
