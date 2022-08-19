import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanListComponent } from './plan-list/plan-list.component';

const routes: Routes = [
  { path: '', component: PlanListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}
