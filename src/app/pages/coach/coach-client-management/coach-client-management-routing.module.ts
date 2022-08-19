import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CcListComponent } from '../coach-client-management/cc-list/cc-list.component';
import { CcAddComponent } from '../coach-client-management/cc-add/cc-add.component';

const routes: Routes = [
  { path: '', component: CcListComponent },
  { path: 'list', component: CcListComponent },
  { path: 'add', component: CcAddComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachClientManagementRoutingModule {}
