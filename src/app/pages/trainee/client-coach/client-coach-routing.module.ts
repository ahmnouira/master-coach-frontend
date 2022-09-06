import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachDetailsComponent } from './coach-details/coach-details.component';
import { FindCoachComponent } from '../find-coach/find-coach.component';
import { CoachListComponent } from './coach-list/coach-list.component';

const routes: Routes = [
  { path: '', component: CoachListComponent },

  { path: 'details/:id', component: CoachDetailsComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientCoachRoutingModule {}
