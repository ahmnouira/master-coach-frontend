import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachSettingsComponent } from './coach-settings.component';

const routes: Routes = [
  { path: '', component: CoachSettingsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachSettingsRoutingModule {}
