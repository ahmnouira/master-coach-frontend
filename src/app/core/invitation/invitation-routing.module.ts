import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';

const routes: Routes = [
  { path: '', component: InvitationFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationRoutingModule {}
