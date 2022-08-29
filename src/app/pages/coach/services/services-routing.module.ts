import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceAddComponent } from './service-add/service-add.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';

const routes: Routes = [
  { path: '', component: ServicesListComponent },

  { path: 'add', component: ServiceAddComponent },

  { path: 'edit/:id', component: ServiceEditComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoutiqueRoutingModule {}
