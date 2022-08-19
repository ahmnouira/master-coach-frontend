import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanPaidComponent } from './plan-paid/plan-paid.component';

const routes: Routes = [
  { path: '', component: PlanListComponent },
  { path: 'paid', component: PlanPaidComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}
