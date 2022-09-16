import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceAddComponent } from './service-add/service-add.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceViewComponent } from './service-view/service-view.component';

const routes: Routes = [
  { path: '', component: ServicesListComponent },

  { path: 'add', component: ServiceAddComponent },

  { path: 'view/:id', component: ServiceViewComponent },

  { path: 'edit/:id', component: ServiceEditComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoutiqueRoutingModule {}
