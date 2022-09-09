import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { RdvDetailComponent } from './rdv-detail/rdv-detail.component';
import { RdvListComponent } from './rdv-list/rdv-list.component';
import { RdvPayComponent } from './rdv-pay/rdv-pay.component';
import { RdvReservationComponent } from './rdv-reservation/rdv-reservation.component';

const routes: Routes = [
  { path: '', component: RdvListComponent },
  { path: 'detail-formation/:id', component: FormationDetailComponent },
  { path: 'reserver', component: RdvReservationComponent },
  { path: 'pay', component: RdvPayComponent },
  { path: 'detail/:id', component: RdvDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RdvRoutingModule {}
