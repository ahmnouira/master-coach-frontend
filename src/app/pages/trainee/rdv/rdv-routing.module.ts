import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { RdvListComponent } from './rdv-list/rdv-list.component';

const routes: Routes = [
  { path: '', component: RdvListComponent },
  { path: 'detail-formation/:id', component: FormationDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RdvRoutingModule {}
