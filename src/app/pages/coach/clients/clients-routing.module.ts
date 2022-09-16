import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CcAddComponent } from './cc-add/cc-add.component';
import { CcListComponent } from './cc-list/cc-list.component';

const routes: Routes = [
  { path: '', component: CcListComponent },
  { path: 'list', component: CcListComponent },
  { path: 'add', component: CcAddComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
