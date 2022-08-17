import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import {ServiceAddComponent} from './service-add/service-add.component'

const routes: Routes = [{ path: '', component: ServicesListComponent }, 

{path: 'add', component: ServiceAddComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoutiqueRoutingModule {}
